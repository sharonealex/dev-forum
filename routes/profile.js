const express = require('express');
const router = express.Router();


// @route GET api/profile 
//dont need token
router.get('/', (req, res)=>{
    res.send('profile route')
})

module.exports = router;