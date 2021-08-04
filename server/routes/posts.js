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

//Posts by id fetch.
router.get('/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: "post not found"})
        }
        
        res.json(post)
    }
    catch(err){
console.error(err.message);
if(err.kind === 'ObjectId'){ //want to return the same response
    return res.status(404).json({msg: "post not found"})
}
res.status(500).send('server error')
    }
})


//Posts by id delete.
router.delete('/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        
        //check if post exists
        if(!post){
            return res.status(404).json({msg: "post not found"})
        }
        //need to chek the user owns the post he is deleting.
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: "user not authorised"})
        }
        else{
            await post.remove();
            res.json({msg: "post deleted"})
        }
        
        res.json(post)
    }
    catch(err){
console.error(err.message);
if(err.kind === 'ObjectId'){ //want to return the same response
    return res.status(404).json({msg: "post not found"})
}
return res.status(500).send('server error')
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


//post update for likes and disklikes.

router.put('/like/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        //check if the post is liked by the same user.
        const userLikes = post.likes.filter((like)=>{
            return like.user.toString() === req.user.id;
        })
        if(userLikes.length > 0){
return res.status(400).json({msg: "post already liked by this user"})
        }
        post.likes.unshift({user: req.user.id})
        await post.save();
       return res.json(post.likes) //returns id of the like object and related user
       
    }catch (err){
        console.log(err)
    }
})


//post unlike feature
router.put('/unlike/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        //check if the post is liked by the same user.
        const userLikes = post.likes.filter((like)=>{
            return like.user.toString() === req.user.id;
        })
        if(userLikes.length === 0){
        return res.status(400).json({msg: "post not yet liked by user"})
        }

        //get the userlike of this particular user
        const userLikeIndex = post.likes.map((like =>{
            like.user.toString().indexOf(req.user.id);
        }));

        post.likes.splice(userLikeIndex, 1);
        await post.save();
       return res.json(post.likes) //returns id of the like object and related user
       
    }catch (err){
        console.log(err)
    }
});

//Comments create. 
//comments dont have likes.
//id is post id
router.post('/comments/:id', auth, async (req, res)=>{
    console.log("inside comment create")
    
    try{
        const user = await User.findById(req.user.id).select('-password');  //to fetch name and avatar from db
        const post = await Post.findById(req.params.id)
        console.log("userrr", user)
        const newComment = {
            text: req.body.text, //only user entered field
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
    post.comments.unshift(newComment);
        await post.save();
        console.log(post, "asdf")
        return res.json(post.comments)
    } catch(err){

    }
   
})


//delete comment
router.delete('/comments/:postId/:commentId', auth, async( req, res)=>{
    try{
    const post = await Post.findById(req.params.postId)

    //get comment for this poast
    const comment = post.comments.find((item)=>{
        return item.id === req.params.commentId;
    })
    if(!comment){
        return res.status(404).json({msg: 'comment does not exist'})
    }
    if(comment.user.toString() !== req.user.id){
        return res.status(404).json({msg: 'user not authorised'})
    }
    const commentIndex = post.comments.map((comment =>{
        comment.user.toString().indexOf(req.user.id);
    }));

    post.comments.splice(commentIndex, 1);
    await post.save();
    return res.json(post.comments)
    }
    catch(err){
        console.log(err)
    }
    });
    //to do update a comment
module.exports = router;