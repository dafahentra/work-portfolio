const https = require('https');
const { URL } = require('url');

// Helper function to make HTTP requests
function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = https.request(reqOptions, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            statusText: res.statusMessage,
            json: () => Promise.resolve(parsed)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            statusText: res.statusMessage,
            text: responseData,
            json: () => Promise.reject(new Error('Invalid JSON'))
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

exports.handler = async function(event, context) {
  console.log('=== Function Execution Start ===');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Body:', event.body);

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400"
  };

  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    console.log('Handling CORS preflight request');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: "CORS preflight successful" })
    };
  }

  // Only allow POST method
  if (event.httpMethod !== "POST") {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers: {
        ...corsHeaders,
        "Allow": "POST, OPTIONS"
      },
      body: JSON.stringify({ 
        success: false, 
        message: `Method ${event.httpMethod} not allowed. Use POST.`
      })
    };
  }

  try {
    // Validate and parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: "Request body is required" 
        })
      };
    }

    let data;
    try {
      data = JSON.parse(event.body);
      console.log('Parsed data:', data);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: "Invalid JSON format" 
        })
      };
    }

    // Validate required fields
    const { name, email, about } = data;
    
    if (!name || !email) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: "Name and email are required" 
        })
      };
    }

    // Check environment variables
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log('Environment check:', {
      hasToken: !!telegramToken,
      hasChatId: !!chatId
    });

    if (!telegramToken || !chatId) {
      console.error('Missing Telegram configuration');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: "Server configuration error"
        })
      };
    }

    // Prepare message
    const message = `🔔 New Portfolio Contact Form Message

👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${about || "(no message provided)"}

📅 ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`;

    const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    
    const requestData = JSON.stringify({ 
      chat_id: chatId, 
      text: message,
      parse_mode: "HTML"
    });

    console.log('Sending message to Telegram...');

    // Send to Telegram
    const telegramResponse = await makeRequest(telegramApiUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Netlify-Function/1.0",
        "Content-Length": Buffer.byteLength(requestData)
      }
    }, requestData);

    const telegramData = await telegramResponse.json();
    
    console.log('Telegram API response:', {
      status: telegramResponse.status,
      ok: telegramData.ok
    });

    if (!telegramData.ok) {
      console.error('Telegram API error:', telegramData);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: "Failed to send message"
        })
      };
    }

    console.log('Message sent successfully');

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true, 
        message: "Message sent successfully!" 
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        message: "Internal server error",
        error: error.message
      })
    };
  }
};