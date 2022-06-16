
// CREATING TOKEN & SAVING BROWSER COOKIE FUNCTION
const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    // options for cookies
    const options = {
        maxAge: process.env.COOKIE_AGE * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PRODUCTION'? true : false,
    };

    res.status(statusCode).cookie(process.env.COOKIE_NAME, token, options).json({
        success: true,
        user,
        token
    })
};

module.exports = sendToken;