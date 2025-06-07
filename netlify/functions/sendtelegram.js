const fetch = require("node-fetch"); // CommonJS

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, about } = data;

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramToken || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "Missing Telegram configuration" }),
      };
    }

    const message = `
New message from portfolio contact form:

Name: ${name}
Email: ${email}
Message: ${about || "(no message)"}
    `;

    const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const telegramRes = await fetch(telegramApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "Telegram API error" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
};
