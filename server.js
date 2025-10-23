// server.js
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const limiter = rateLimit({
  windowMs: 60*1000,
  max: 6,
  message: { error: "Too many requests, slow down." }
});
app.use('/api/', limiter);

function isValidNumber(n){
  return typeof n === 'string' && /^\+\d{8,15}$/.test(n);
}

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN  = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM;

let twilioClient = null;
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  const twilio = require('twilio');
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

app.post('/api/send', async (req, res) => {
  try {
    const { number, message } = req.body;
    if (!number || !message) return res.status(400).json({ error: "number and message required" });
    if (!isValidNumber(number)) return res.status(400).json({ error: "Invalid number format. Use +<countrycode><number>" });

    if (!twilioClient) {
      return res.status(500).json({ error: "Twilio not configured on server. Set TWILIO_* env vars." });
    }

    const to = 'whatsapp:' + number;
    const from = TWILIO_WHATSAPP_FROM;

    const msg = await twilioClient.messages.create({
      body: message,
      from,
      to
    });

    return res.json({ ok:true, id: msg.sid, status: msg.status });

  } catch (err) {
    console.error('send error', err);
    return res.status(500).json({ error: err.message || 'internal error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
