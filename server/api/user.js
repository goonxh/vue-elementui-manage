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

/**
 * 获取用户列表
 */
app.get('/user',function (req, res) {
    let page = parseInt(req.query.page), pageSize = parseInt(req.query.pageSize);
    let query = models.user.find({});
    let pagination = {};
    models.user.countDocuments({},function (error, data) {
        if(error) throw error;
        if(data){
            pagination.total = data;
            pagination.pageSize = pageSize;
            pagination.currentPage = page;
            query.skip((page-1)*pageSize).limit(pageSize).exec((error, data) => {
                if(error) throw error;
                if(data) {
                    res.json({data:data,pagination:pagination});
                }
            })
        }
    });
})

/**
 * 根据id删除用户
 */
app.delete('/user/:id',function (req, res) {
   models.user.deleteOne({_id: req.params.id}, function (error) {
       if(error) throw error;
       res.send('1');
   });
})



module.exports = app;