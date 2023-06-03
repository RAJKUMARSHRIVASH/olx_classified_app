const express = require("express");
const UserModel = require("../models/UserModel");
const saltRounds = 4;
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup",async(req,res)=>{
    const payload = req.body;
    if(payload.password == payload.confirmPass){
        try {
            const data = await UserModel.findOne({email:payload.email});
            if(data){
                res.json({msg:"user already registered please login"});
            }
            else {
                bcrypt.hash(payload.password,saltRounds,async(err,hash)=>{
                    if(err){
                        res.json({msg:err});
                    }
                    else {
                        const user = new UserModel({email:payload.email,password:hash});
                        await user.save();
                        res.json({msg:"user registered successfully"});
                    }
                })
            }
        } catch (error) {
            res.json({msg:"Something went wrong while signup "+error});
        }
    }
    else {
        res.json({msg:"password doesn't match"});
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const data = await UserModel.findOne({email});
        if(data){
            bcrypt.compare(password,data.password,async(err,result)=>{
                if(err){
                    res.json({msg:err});
                }
                else if(result){
                    jwt.sign({userID:data._id},"olxraj",async(err,token)=>{
                        if(err){
                            res.json({msg:err});
                        }
                        else {
                            res.json({msg:"Login Successful",token});
                        }
                    });
                }else if(!result) {
                    res.json({msg:"Wrong password"});
                }
            })
        }
    } catch (error) {
        res.json({msg:"Something went wrong while sign in "+error});
    }
});


module.exports = userRouter;
