const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const authenticateToken = require("../utils/middleware/checkAuth");
const authenticateTokenWhilePending = require("../utils/middleware/checkAuthWhilePending");

router.get("/todos", authenticateTokenWhilePending, async (req, res) => {
    try {
        const tokenData = req.header("Authorization").split(" ");
        console.log(tokenData);
        const token = tokenData[1];
        console.log("from backend",req.userId);
        if (!token) return res.json(false);
    
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verified);
        if (!verified) return res.json(false);
        console.log("v ",req.userId);
        await User.findById(req.userId,(err)=>{
            console.log(err);
        });
        console.log("user",user.firstName);
        console.log("userTodos",user.todos);
        if (!user) return res.json(false);
    
        return res.json({
            name:user.firstName,
            todos:user.todos
        });
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    // console.log("frpm home");
    // try{
    //     console.log(req.userId);
    //     const user = await User.findById(req.userId);
    //     console.log(user);
    //     // if(!user) return res.json({msg:"User does not exists"});
    //     if(!user){
    //         console.log(user);
    //     }
        
    //     return res.json({
    //         user:[{
    //             name:user.firstName,
    //             todos:user.todos
    //         }]
    //     })
    // }
    // catch(err){
    //     return res.json(false);
    // }
});

module.exports = router;