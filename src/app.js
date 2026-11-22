const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));


app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/check",(req, res) => {
    res.json({
        success: true,
        message: "Smart Logistics API is running"
    })
});

// Health check API
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api', require('./routes/shipmentRoutes'));

app.use(errorHandler);

module.exports = app;