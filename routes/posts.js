const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post =  require('../models/Post');
const router = express.Router();
const auth = require('../utils/auth')



// @route GET api/posts 
//posts are private. - getting people to signup. Profiles are public.
router.get('/',async (req, res)=>{
    try{
const posts = await Post.find().sort({date: -1}) //to get the latest post
res.json(posts)
    }
    catch(err){
        console.log(err)
    }

})


//logged into create a route. so need auth middleware

router.post('/', auth, async (req, res)=>{
    console.log("inside post create")
    
    try{
        const user = await User.findById(req.user.id).select('-password');  //to fetch name and avatar from db
        console.log("userrr", user)
        const newPost = new Post({
            text: req.body.text, //only user entered field
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        console.log(newPost, "new post")
        const post = await newPost.save();
        console.log(post, "asdf")
        return res.json(post)
    } catch(err){

    }
   
})

module.exports = router;