const express = require("express");
const PostAdsModel = require("../models/PostAdsModel");
const postAdsRoute = express.Router();

postAdsRoute.post("/", async (req, res) => {
    const payload = req.body;
    req.body.date = new Date();
    try {
        const post = new PostAdsModel(payload);
        await post.save();
        res.json({ msg: "new ad posted" });

    } catch (error) {
        res.json({ msg: "Something went wrong while posting ad. " + error });

    }
})

postAdsRoute.get("/getall", async (req, res) => {
    try {
        const data = await PostAdsModel.find();
        res.json({ msg:"ALl data",data});

    } catch (error) {
        res.json({ msg: "Something went wrong while posting ad. " + error });

    }
})

module.exports = postAdsRoute;
