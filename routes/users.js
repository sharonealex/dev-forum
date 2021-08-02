const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar')
const config = require('config');
const jwt = require('jsonwebtoken');



// @route GET api/users 
//dont need token
router.post('/', async (req, res)=>{

    const {name, email, password} = req.body;
    console.log(req.body)
    console.log(name)
    console.log(email)
    console.log(password)
    try{
    //see if user exists
    let user = await User.findOne({email})
        if(user){
            res.status(400).json({errors: [{msg: 'user already exists'}]})
        }
    //get users gravatar based on their email
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    //encrypt password using bcrypt
    //creates a new user instance
    user = new User ({
        name,
        email,
        password
    });
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt); //creates a hash.

    //save to db
    await user.save();
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(
        payload,
        config.get('JWT_SECRET'),
        {
            expiresIn: 360000
        },
        (err, token)=>{
            if (err) throw err;
            res.json({token}); 
        }
    )
      
    //return json webtoken, so user is logged in right away without going through another link to log in.
    }catch (err){
        console.error(err.message);
        res.status(500).send("internal server error");
    }
})

module.exports = router;