const express = require('express');
const router = express.Router();
const auth = require('../utils/auth')
const Profile = require('../models/Profile')
const User = require('../models/User')


// @route GET api/profile 
//dont need token
router.get('/', (req, res)=>{
    res.send('profile route')
})

// Route for fetching profile of logged in current user.
router.get('/me', auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: 'no profile for this user'})
        }
        return res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error')
    }
})

module.exports = router;