const express = require("express"); 
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { loginUser } = require("../controllers/userController");

// SET ACCOUNT CREATE LIMIT
const loginAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 5 MINUTES
    max: 1000, // Limit each IP to 5 create account requests per `window` (here, per hour)
    message: 'Too many request created from this IP, please try again after an hour',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.route("/login").post(loginAccountLimiter, loginUser);

module.exports = router;