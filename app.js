const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

// const errorMiddleware = require("./middlewares/errorMiddleware");

// dot environment config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: './config/config.env' });
}



app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));


app.use(cors({
    origin: process.env.NODE_ENV !== "PRODUCTION" ? "http://localhost:3000" : process.env.FRONTEND_URL,
    credentials: true
}));


const user = require("./routes/userRoutes");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

app.use("/api/v1", user);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "This is DREAMLAND REST API, Developed by ITZone Inc."
    });
});



app.get('/api/v1', (req, res) => {

    res.status(200).json({
        message: "This is DREAMLAND REST API Version 1, Developed by ITZone Inc."
    });
});

// ERROR MIDDLEWARES
app.use(errorMiddleware)

module.exports = app;