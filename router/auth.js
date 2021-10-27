const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");
const User = require("../models/userSchema");

  
// Registeratiion page in async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password } = req.body;
  if (!name || !email || !phone || !work || !password) {
    return res.status(422).json({ error: "Plz filled the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }

    const user = new User({ name, email, phone, work, password });
    await user.save();

    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});
// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz field the  data " });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jstoken", token, {
        expires: new Date(Date.now() + 1200000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(404).json({ error: "user error Successfully " });
      } else {
        res.json({ message: "user login Successfully " });
      }
    } else {
      res.status(404).json({ error: "user error in input part" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/register",async(req,res)=>{
 try {
  const newUser=await User.find();
  res.send(newUser);
 } catch (e) {
   res.send(e); 
 }

 
router.patch("/register/:id",async (req,res) =>{
  try {
    const _id = req.params.id;
    const updateRegister = await User.findByIdAndUpdate(_id,req.body,{
      new:true
    });
    res.send(updateRegister);
  } catch (e) {
    res.status(400).send(e);
    
  }
})
//  //Get the indivisual Student DATA USING ID 
//  this.route.get("/register/:id",async(req,res)=>{
//    try {
//     const _id = req.params.id;
//     const userId = await reactPlaylist.findById(_id);

//     if (!userId) {
//       return res.status(404).send();
//       console.log();
//     } else {
//       res.send(userId);
//     }
//   } catch (e) {
//     res.send(e);
//   }
//  })

 


})

module.exports = router;
