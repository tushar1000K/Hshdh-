WhatsApp Sender (example)
=========================
This bundle contains a sample frontend (public/index.html) and a Node.js Express backend (server.js)
that demonstrates sending WhatsApp messages via Twilio's API.

Files:
- public/index.html      -> Frontend (stylish preview + form)
- server.js              -> Express server (POST /api/send)
- package.json
- .env.example

Setup:
1. Copy the project somewhere and `cd` into it.
2. Copy `.env.example` to `.env` and fill in your TWILIO credentials and WhatsApp-enabled 'from' number.
3. Place `index.html` into a folder named `public` (already done in this bundle).
4. Install dependencies:
   npm install
5. Start the server:
   npm start
6. Open your browser at http://localhost:3000/

Important:
- Only send messages to recipients who have given explicit consent.
- For production use add persistent logs, database, job queue and stronger rate limits.
- Using automation that violates WhatsApp/Twilio terms may get numbers/accounts banned.

Telegram integration:
If you want your Telegram bot to trigger sends, I can add a secure endpoint and a small Telegram snippet.
