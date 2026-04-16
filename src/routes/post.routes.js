const express = require('express');

const router = express.Router();

router.post("/create", (req, res) =>{
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    res.send("post Created Successfully")
})

module.exports = router;