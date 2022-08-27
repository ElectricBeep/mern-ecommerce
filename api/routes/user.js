const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, } = require("./verifyToken");
const CryptoJs = require("crypto-js");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password.CryptoJs.AES.encrypt(
            req.body.password,
            process.env.SECRET
        ).toString();
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    };
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    };
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5) //Return 5 latest users
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    };
});

//GET USER STATS
//Returns total number of users per month
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(
        date.setFullYear(date.getFullYear() - 1) //Returns last year today
    );
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } }, //Match created at greater then last year
            {
                $project: {
                    month: { $month: "$createdAt" } //Created month variable and take the month number inside createdAt
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;