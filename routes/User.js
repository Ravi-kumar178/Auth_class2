const express = require("express");
const router = express.Router();

//import controller
const {SignUp} = require("../controllers/SignUp");
const {login} = require("../controllers/login");
const {Auth} = require("../Middleware/Auth");
const {Student} = require("../Middleware/Auth");
const {Admin} = require("../Middleware/Auth")

//routes
router.post("/signup",SignUp);
router.post("/login",login);

router.get("/test",Auth,(req,res)=>{
    res.status(200).json({
        success: true,
        message:"Welcome to the protected route for auth"
    })
})

router.get("/student",Auth,Student,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the protected route for student"
    })
})

router.get("/admin",Auth,Admin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the protected route for admin"
    })
})

module.exports = router;