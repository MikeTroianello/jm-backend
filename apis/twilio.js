require('dotenv').config();

const accountSid = process.env.SID;
const authToken = process.env.AUTH_TOKEN;
const fromPhone = process.env.FROM_PHONE;
const toPhone = process.env.TO_PHONE;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: toPhone,
    from: fromPhone,
    body: 'YEET',
  })
  .then((message) => console.log(message.sid));
