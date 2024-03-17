const Users = require("../models/Users");
const bcrypt = require("bcrypt");


exports.SignUp = async(req,res) =>{
  try{ 
    //extract name,email,password,role from req
    const {name,email,password,role} = req.body;
    //check if all is enteres
    if(!name || !email || !password || !role){
        return res.status(401).json({
            success:false,
            message: "Please enter all the data carefully"
        });
    }
    //check if the user is already registered
    const alreadyExisting = await Users.findOne({email});

    if(alreadyExisting){
        return res.status(400).json({
            success: false,
            message: "User is already registered"
        })
    }

    //hash the password
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password,10);
       
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message:"Error in hashing password"
        });
    }
    
    
    //create database and enter
    const user = await Users.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    return res.status(200).json({
        success:true,
        message:"User is signed in Successfully"
    });
 }
 catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"There is error in server side"
    })
 }
}