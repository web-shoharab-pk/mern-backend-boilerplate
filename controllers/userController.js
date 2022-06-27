const catchAsynceError = require("../middlewares/catchAsynceError");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require("../error/errorHandler"); 

// LOGIN USER 
exports.loginUser = catchAsynceError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});