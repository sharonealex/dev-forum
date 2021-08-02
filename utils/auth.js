const jwt = require('jsonwebtoken')
const config = require('config');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

module.exports = function(req, res, next) {
    //get jwt token from header of the incomming request
    const token = req.header('Authorization')
    //check if token present
    if(!token){
        return res.status(401).json({msg: 'User unauthorized'})
    }
    //verify token
    try{
        const decoded = jwt.verify(token, config.get('JWT_SECRET'));
        req.user = decoded.user;
        next();
    } catch(err){
        res.status(401).json({msg: 'token invalid'});
    }
}

