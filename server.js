const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_TOKEN = '7708820854:AAEvFi5DQ5j-3FdxBcIQU34_U6XBvZ_ID5U';
const CHAT_ID = '6110107643';

app.post('/send-telegram', async (req, res) => {
  const { name, email, about } = req.body;

  const message = `New message from portfolio contact form:\nName: ${name}\nEmail: ${email}\nMessage: ${about}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      }),
    });

    const data = await response.json();

    if (data.ok) {
      res.send({ success: true, message: 'Message sent to Telegram' });
    } else {
      res.status(500).send({ success: false, message: 'Failed to send message', error: data });
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    res.status(500).send({ success: false, message: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));