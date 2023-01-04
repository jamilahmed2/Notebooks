const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'jamilisab$oy';
// ROUTE 1: Create a user using:POST endpoint"/api/auth/createuser". No login require
router.post('/createuser', [
    // user name lenght must be
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    // username must be an email
  body('email', 'Enter a valid Email').isEmail(),
  // password must be at least 6 chars long
  body('password','Password must be atleast 6 characters').isLength({ min: 6 }),
],async (req,res)=>{
   let  success =  false;
    // if there are errors, return Bad request and Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check whether user with email is already exists or not

    try {
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error:"This user is already exists"})
    }
    // salt hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    // create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

      // sending atoken
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success,authToken});
      
      // sending a user
      // res.json(user)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");  
    }
});

// ROUTE 2: Login a user using:POST endpoint"/api/auth/login". No login required
router.post('/login', [
body('email', 'Enter a valid Email').isEmail(),
body('password', 'Password cannot be blank').exists()
],async (req,res)=>{
  let  success =  false;
  // if there are errors, return Bad request and Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // destructering
  const {email,password} = req.body;
  try {
    // comparing email
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Please try to login with correct credentials"});
    }

    
    // comparing password using bcrypt
    const passwodCompare = await bcrypt.compare(password,user.password);
    if(!passwodCompare){
      success =  false
      return res.status(400).json({success, error:"Please try to login with correct credentials"});
    }

    // sending payload(data) for correct credentials
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data,JWT_SECRET);
    success =  true
    res.json({success,authToken});

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");  
  }

});

// ROUTE 3: Get loggedin user details using:POST endpoint"/api/auth/getuser". login required
router.post('/getuser', fetchuser ,async (req,res)=>{
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
      // res.json({user});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");  
    }
});
module.exports = router