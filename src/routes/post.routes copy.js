const express = require('express');
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const router = express.Router();

router.post("/create",async (req, res) =>{
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //    console.log(decoded)
          const user = await userModel.findOne({
            _id: decoded.id
          })
          console.log(user)
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    res.send("post Created Successfully")
})

module.exports = router;