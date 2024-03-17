const mongoose = require("mongoose");

require("dotenv").config();
const dbConnect = () => {
    const URL = process.env.DATABASE_URL;

    if(!URL){
        console.log("Please enter the url of Database");
    }

    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    .then(()=>{console.log("Database Connected Successfully")})
    .catch((err)=>{
        console.log("Error in Database Connection");
        process.exit(1);
    })
}

module.exports = dbConnect;