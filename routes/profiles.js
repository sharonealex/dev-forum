const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const auth = require('../utils/auth');
const router = express.Router();





// Route for fetching profile of logged in current user.
router.get('/me', auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'no profile for this user'})
        }
        return res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error')
    }
})

/**
 * POST api/profile to CREATE or UPDATE user profile
 */

router.post('/',auth, async(req, res)=>{
   try{
       const {
           company,
           website,
           location,
           bio,
           status,
           githubuser,
           skills,
           youtube,
           facebook,
           twitter,
           instagram,
           linkedin
       } = req.body;

       //build profile object.
       const profileFields = {};
       profileFields.user = req.user.id;
       if(company) profileFields.company = company;
       if(website) profileFields.website = website;
       if(location) profileFields.location = location;
       if(bio) profileFields.bio = bio;
       if(status) profileFields.status = status;
       if(githubuser) profileFields.githubuser = githubuser;
       if(skills) {
           profileFields.skills = skills.split(',').map((item)=>{
               return item.trim();
           })
       }
       //build social object.
       profileFields.social = {};
       if(youtube) profileFields.social.youtube = youtube;
       if(facebook) profileFields.social.facebook = facebook;
       if(twitter) profileFields.social.twitter = twitter;
       if(instagram) profileFields.social.instagram = instagram;
       if(linkedin) profileFields.social.linkedin = linkedin;

       let profile = await Profile.findOne({user: req.user.id});
       if(profile){
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id},
            {$set: profileFields},
            {new: true}
            )
            return res.json(profile);
       }
       
       //if not found, create a new profile
       profile = new Profile(profileFields);
       await profile.save();
       return res.json(profile);

    }catch(err){
       console.log(err)
       res.status(500).send('server error')
   }
})

/**
 * to get all profiles of all developers
 * is going to be public
 */

router.get('/', async(req, res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return res.json(profiles)

    } catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
})

/**
 * to Get Profile by User ID
 * is going to be public
 */

 router.get('/user/:user_id', async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile) return res.status(404).json({msg: 'profile not found'})
        return res.json(profile)

    } catch(err){
        console.error(err.message)
        if(err.kind == 'ObjectId') return res.status(404).json({msg: 'profile not found'})
        res.status(500).send('server error')
    }
})

/**
 * delete route
 */

router.delete('/', auth, async(req, res) => {
    try{
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});
      
        return res.json({msg: 'profile deleted'})

    } catch(err){
        console.error(err.message)
        if(err.kind == 'ObjectId') return res.status(404).json({msg: 'profile not found'})
        res.status(500).send('server error')
    }
})


module.exports = router;