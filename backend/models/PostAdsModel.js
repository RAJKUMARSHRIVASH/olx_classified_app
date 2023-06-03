const mongoose = require("mongoose");

const postAdSchema = mongoose.Schema({
   name:String,
   description:String,
   category:String,
   image:String,
   location:String,
   date:Date,
   price:Number
});

const PostAdsModel = mongoose.model("ads",postAdSchema);

module.exports = PostAdsModel;