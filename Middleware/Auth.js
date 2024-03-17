const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Auth = async(req,res,next) => {
    try{
        //extract token from req body
        const token = req.body.token || req.cookie.token||req.header("Authorization").replaceAll("bearer "," ");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            });
        }

        //verify the token
        try{
            const payload =jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Server Down"
        });
    }
}

exports.Student = (req,res,next) => {
    try{
        if(req.user.role != "Student"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Student"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

exports.Admin = (req,res,next) => {
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}