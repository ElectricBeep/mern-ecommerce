const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);