// Updated version with better error handling and debugging
const fetch = require('node-fetch');
exports.handler = async function(event, context) {
  console.log('Function called with method:', event.httpMethod);
  console.log('Event body:', event.body);

  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    // Parse request body
    let data;
    try {
      data = JSON.parse(event.body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: false, message: "Invalid JSON data" }),
      };
    }

    const { name, email, about } = data;

    // Validate required fields
    if (!name || !email) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: false, message: "Name and email are required" }),
      };
    }

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log('Environment check:', {
      hasToken: !!telegramToken,
      hasChatId: !!chatId,
      tokenLength: telegramToken ? telegramToken.length : 0
    });

    if (!telegramToken || !chatId) {
      return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ 
          success: false, 
          message: "Missing Telegram configuration",
          debug: {
            hasToken: !!telegramToken,
            hasChatId: !!chatId
          }
        }),
      };
    }

    const message = `🔔 New Portfolio Contact Form Message

👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${about || "(no message provided)"}

📅 ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`;

    const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    console.log('Sending to Telegram API...');

    // Use built-in fetch (available in Node.js 18+)
    const telegramRes = await fetch(telegramApiUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Netlify-Function/1.0"
      },
      body: JSON.stringify({ 
        chat_id: chatId, 
        text: message,
        parse_mode: "HTML"
      }),
    });

    const telegramData = await telegramRes.json();
    
    console.log('Telegram API response:', {
      status: telegramRes.status,
      ok: telegramData.ok,
      error: telegramData.error_code ? telegramData.description : null
    });

    if (!telegramData.ok) {
      return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ 
          success: false, 
          message: "Telegram API error",
          error: telegramData.description || "Unknown Telegram error",
          error_code: telegramData.error_code
        }),
      };
    }

    console.log('Message sent successfully');

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true, message: "Message sent successfully!" }),
    };

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        success: false, 
        message: "Internal server error",
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
};