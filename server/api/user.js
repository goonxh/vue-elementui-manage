const models = require('../db');
const express = require('express');
const app = express();

/**
 * 根据用户id获取用户信息 /userInfo
 */
app.post('/userInfo',(req,res) =>{
    models.user.findOne({_id: req.body.id}, (error, user) =>{
        if(error) throw error;
        if(!user) {
            res.send('用户不存在');
        }else {
            res.send({
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role
            })
        }
    })
})

module.exports = app;