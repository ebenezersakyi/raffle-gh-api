const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

//enable cors
app.use(cors());

// Twilio credentials
const accountSid = "AC433a6b117e4fd8f57d567940e674a76d";
const authToken = "52b4f17942646d47edf515e66254a6f2";
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

// Define an endpoint to send SMS
app.post("/send-sms", (req, res) => {
  const { to, body } = req.body;
  console.log(`Starting`);

  client.messages
    .create({
      body: body || "Hello world", // Use the provided body or a default message
      to: to || "+233543306447", // Use the provided 'to' number or a default number
      from: "+12568183448",
    })
    .then((message) => {
      console.log(`SMS sent with SID: ${message.sid}`);
      res.status(200).json({ message: "SMS sent successfully" });
    })
    .catch((error) => {
      console.error(`Error sending SMS: ${error.message}`);
      res.status(500).json({ error: "Failed to send SMS" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
