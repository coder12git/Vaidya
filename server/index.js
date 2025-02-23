// main server
require("dotenv").config();
const express = require ('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const twilio = require('twilio');
const PORT = process.env.PORT || 8000;

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken= process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSID, authToken);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Use text router
const textRoutes = require('./routes/text.routes');
app.use('/sms', textRoutes);

// // Use call router
const callRoutes = require('./routes/call.routes');
app.use('/voice', callRoutes);

// Call logs
app.get('/call-logs', async (req, res) => {
    try {
        const calls = await client.calls.list({ limit: 50})// Fetch last 50 calls
        const callLogs = calls.map(call => ({
            dateTime: call.dateCreated.toLocaleString(),
            phoneNumber: call.from,
            serviceType: 'Voice Call', 
            duration: call.duration,
            responseSummary: call.status,
        }));

        res.json(callLogs);
    } catch (error) {
        console.error('Error fetching call logs:', error);
        res.status(500).json({ error: 'Failed to fetch call logs' });
    }
});

// SMS logs
app.get('/sms-logs', async (req, res) => {
    try {
        const calls = await client.calls.list({ limit: 50});
        const callLogs = calls.map(call => ({
            dateTime: call.dateCreated.toLocaleString(),
            phoneNumber: call.from,
            serviceType: 'SMS', 
            duration: call.duration,
            responseSummary: call.status, 
        }));

        res.json((callLogs));
    } catch (error) {
        console.error('Error fetching call logs:', error);
        res.status(500).json({ error: 'Failed to fetch call logs' });
    }
});

app.get("/", (req,res)=>{
    res.json({ message: "Welcome to Sahayak, A Gen AI-based medical assistant that works without the internet, accessible via a simple phone call. To use the service, please call us at the given number: +19283796252" });
});

app.listen(PORT, () => {
    console.log("Express server started on PORT ", PORT);
})