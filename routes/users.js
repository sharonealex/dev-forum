const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar')



// @route GET api/users 
//dont need token
router.post('/', async (req, res)=>{

    const {name, email, password} = req.body;
    try{

        //workflow

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
        res.status(200).send('user reisterd')
    //return json webtoken, so user is logged in right away without going through another link to log in.

    }catch (err){
        console.error(err.message);
        res.status(500).send("internal server error");
    }
    res.send('User route')
    
})

module.exports = router;