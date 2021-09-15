const express = require('express');
const router=express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator');
const bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

//ROUTE 1:create a user :POST "/api/auth/createuser .no login require

const JWT_secret = 'PrashantKumar224Yadav@';

router.post('/createuser',[
    body('name','Plz Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password should be of minimum 5 character').isLength({ min: 5 }),

],async(req, res) => {
    
        let sucess=false;
        // for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //check wheater the user with this email exist already
        try {
        let user=await User.findOne({ email: req.body.email});
        if(user)
        return res.status(400).json({sucess, error:"This email is already in use"})
        
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data={
            user:{
                id:user.id
            }
        }
        sucess=true;
        const authToken=jwt.sign(data,JWT_secret);

        //by this auth token we can get data and from data we get id of user and then by id we get info of user

        res.json({sucess,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
    
})

//ROUTE 2:Authenticate the users using:POST "/api/auth/login",no login require

router.post('/login',[
    body('email').isEmail(),
    body('password').exists(),
],async(req, res) => {
    
        // for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           let sucess = false;
          return res.status(400).json({sucess, errors: errors.array()});
        }
    try{
        let {email, password}=req.body;
        let user=await User.findOne({ email: email});
        if(!user){
            return res.status(400).json({error:"please fill correct details"});
        }
        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({error:"please fill correct details"});
        }

        const data={
            user:{
                id:user.id
            }
        }
        
        const authToken=jwt.sign(data,JWT_secret); //this auth token contain the id of user 
        let sucess = true;
        res.json({sucess,authToken});
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})


//ROUTE 3: get loggedin user details using:POST "/api/auth/grtuser",login require

router.post('/getuser',fetchuser,async(req, res) => {
    
    try{
       const userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;