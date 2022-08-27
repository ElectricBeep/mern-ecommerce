const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        img: req.body.img,
        phone: req.body.phone,
        address: req.body.address,
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    };
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401).json("Wrong username or password!");
            return;
        }

        //To check password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            res.status(404).json("Wrong password or username!");
            return;
        }

        const accessToken = jwt.sign(
            {
                //Keeping this info inside token
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        const { password, ...info } = user._doc; //So we don't send password back
        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;