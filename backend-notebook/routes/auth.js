const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'jamilisab$oy';
// Create a user using:POST endpoint"/api/auth/createuser". No login require

router.post('/createuser', [
    // user name lenght must be
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    // username must be an email
  body('email', 'Enter a valid Email').isEmail(),
  // password must be at least 5 chars long
  body('password','Password must be atleast 6 characters').isLength({ min: 6 }),
],async (req,res)=>{
    console.log(req.body)
    
    // if there are errors, return Bad request and Errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      res.json({authToken});
      
      // sending a user
      // res.json(user)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")   
    }
});

module.exports = router