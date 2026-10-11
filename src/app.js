const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/check",(req, res) => {
    res.json({
        success: true,
        message: "Smart Logistics API is running"
    })
});

app.use('/api', require('./routes/shipmentRoutes'));
app.use(errorHandler);

module.exports = app;