// main server
require("dotenv").config();

const express = require ('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Use text router
const textRoutes = require('./routes/text.routes');
app.use('/sms', textRoutes);

// // Use call router
const callRoutes = require('./routes/call.routes');
app.use('/voice', callRoutes);

app.get("/", (req,res)=>{
    res.json({ message: "Welcome to Sahayak, A Gen AI-based medical assistant that works without the internet, accessible via a simple phone call. To use the service, please call us at the given number: +19283796252" });
});

app.listen(PORT, () => {
    console.log("Express server started on PORT ", PORT);
})