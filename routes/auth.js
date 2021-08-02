const express = require('express');
const router = express.Router();


// @route GET api/auth 
//dont need token
router.get('/', (req, res)=>{
    res.send('auth route')
})

module.exports = router;