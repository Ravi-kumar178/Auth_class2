const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const user = require("./routes/User");
app.use("/api/v1",user);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT,()=>{
    console.log(`App is started at ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("<h1>This is homepage</h1>");
})