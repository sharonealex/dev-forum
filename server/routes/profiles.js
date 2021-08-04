const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const auth = require('../utils/auth');
const router = express.Router();
const request = require('request');
const config = require('config');





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

/**
 * add experience section.
 * todo: add code to update experience.
 */

router.put('/experience', auth, async(req, res)=>{
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExperience = {  //object with data user submits.
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    console.log(newExperience)
    try {
        const profile = await Profile.findOne({user: req.user.id});
        console.log(profile)
        profile.experience.unshift(newExperience);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
})

/**
 * delete experience
 */

router.delete('/experience/:exp_id', auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id});

        //get index.
        const indextToRemove = profile.experience.map((item)=>{
            item.id
        }).indexOf(req.params.id);

        profile.experience.splice(indextToRemove, 1);
        await profile.save();
        res.json(profile)
    }catch (err){
        console.log(err)
    }
})

/**
 * Add and remove education
 */

 router.put('/education', auth, async(req, res)=>{
    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEducation = {  //object with data user submits.
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    }
    console.log(newEducation)
    try {
        const profile = await Profile.findOne({user: req.user.id});
        console.log(profile)
        profile.education.unshift(newEducation);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
})

/**
 * delete education
 */

 router.delete('/education/:edu_id', auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id});

        //get index.
        const indextToRemove = profile.education.map((item)=>{
            item.id
        }).indexOf(req.params.id);

        profile.education.splice(indextToRemove, 1);
        await profile.save();
        res.json(profile)

    }catch (err){
        console.log(err)
    }
})
/***
 * get github profiles, public. as viewing profile is public
 */

router.get('/github/:username', (req, res)=>{
    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=8&sort=:asc&client_id=${config.get('GITHUB_CLIENT_ID')}
            &client_secret=${config.get('GITHUB_CLIENT_SECRET')}
            `,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }
        request(options, (error, response, body)=>{
            if(error){
                console.log(error)
            }
            if(response.statusCode != 200){
                return res.status(404).json({msg: 'no github profile found'})
            }
            return res.json(JSON.parse(body))
        })

    }catch(err){
        console.error(err.message);
        return res.status(500).send('server error')
    }
})

module.exports = router;