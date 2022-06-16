const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name Cannot Exceed 30 Characters"],
        minlength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email"]
    },
    phone: {
        type: String,
        required: [true, "Please Enter Your Phone Number"],
        minlength: [11, "Name Cannot Exceed 11-14 Characters"],
        maxlength: [17, "Name Cannot Exceed 11-14 Characters"],
    },
    address: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
            default: "Bangladesh"
        },
        postCode: {
            type: Number,
        }
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [6, "Password should be greater than 6 characters"],
        select: false
    },
    // avatar: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    role: {
        type: String,
        default: "user"
    },
    rewardPoint: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    accountCreatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { 
        expiresIn: Date.now() + process.env.COOKIE_AGE * 24 * 60 * 60 * 1000
    })
};

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)
}

// GENERATE RESET PASSWORD TOKEN
userSchema.methods.getResetPasswordToken = async function () {

    // GENERATING TOKEN
    const resetToken = crypto.randomBytes(20).toString("hex");

    // HASHING AND ADDING RESETTOKEN IN DB
    this.resetPasswordToken = crypto.createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = model("User", userSchema);