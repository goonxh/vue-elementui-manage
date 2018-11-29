const models = require('../db');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {formatDateTime} = require('../utils');
const requst = require('request');

// 定义签名
const secret = 'salt';
// 生成token
let token = () => {
    return jwt.sign({
        name: 'vueToken'
    }, secret, {
        expiresIn: 6000 //秒到期时间
    })
}

// 使用中间件验证token合法性
app.use(expressJwt({
    secret: secret
}).unless({
    path: ['/api/login','/','/api/logout']  //除了这些地址，其他的url都需要验证
}))

// 拦截器
app.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if(err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
})


const getAddByIp = ip => new Promise((resolve,reject)=>{
    if(ip === '127.0.0.1'){
        resolve('本地');
    } else {
        requst(`http://opendata.baidu.com/api.php?query=${ip}&co=&resource_id=6006&t=1412300361645&ie=utf8&oe=utf8&format=json&tn=baidu`,(err,res,req) =>{
            if(err) resolve('不明');
            if(res.statusCode == 502) resolve('不明');
            if(res.statusCode == 200) {
                let reqJson = JSON.parse(req);
                resolve(`${reqJson.data[0].location?reqJson.data[0].location:'不明'}`);
            }
        })
    }
})

/**
 * 注册 /register
 */
app.post('/api/register',(req,res) => {
    let newUser = new models.user({
        username: req.body.username,
        name: req.body.name?req.body.name:null,
        password: req.body.password,
        role: req.body.role?req.body.role:null,
        email: req.body.email?req.body.email:null,
    })
    models.user.findOne({username: req.body.username}, (error, user) =>{
        if(error) throw error;
        if(user) {
            return res.send('用户名已存在');
        }else {
            newUser.save((err,data) =>{
                if(err) {
                    return res.send(err);
                }else{
                    return res.send('1');
                }
            })
        }
    })

})
/**
 * 修改密码等用户个人信息
 */
app.patch('/api/user', (req,res)=>{
    let id = req.body.id;
    let oldPassword = req.body.oldPassword;
    models.user.findOne({_id: id}, (error, user) =>{
        if(error) throw error;
        if(!user) {
            return res.send('用户名不存在');
        }else {
            user.comparePassword(oldPassword, (err, isMatch)=>{
                if(err) res.send(err);
                if(isMatch) {
                    models.user.where({ _id: id })
                        .setOptions({ multi: true })
                        .update({password: req.body.password,
                        role: req.body.role?req.body.role:null,
                        email: req.body.email?req.body.email:null},
                        (error,writeOpResult) => {
                        if(error) return console.log(error);
                        console.log(writeOpResult);
                        return res.send('1');
                    })
                } else {
                    return res.send('密码错误');
                }
            })
        }
    })
})

/**
 * 登录 密码验证  /login
 */
app.post('/api/login',(req,res) =>{
    models.user.findOne({username: req.body.username}, (error, user) =>{
        if(error) throw error;
        if(!user) {
            res.send('用户名不存在');
        }else {
            user.comparePassword(req.body.password, function(err, isMatch){
                if(err) res.send(err);
                if(isMatch) {
                    res.json({
                        success:1,
                        user:user,
                        token:token()
                    });
                    let ip = req.connection.remoteAddress.replace('::ffff:','') === '127.0.0.1'?'127.0.0.1':req.headers('X-real-ip');
                    getAddByIp(ip).then((res)=>{
                        let newLog = new models.log({
                            user: user.name,
                            date: formatDateTime(new Date()),
                            action: '登录',
                            ip: ip,
                            add: res,
                        })
                        newLog.save();
                    })
                } else {
                    res.send('密码错误');
                }
            })
        }
    })
})

app.post('/api/logout',(req,res)=>{
    let ip = req.connection.remoteAddress.replace('::ffff:','') === '127.0.0.1'?'127.0.0.1':req.headers('X-real-ip');
    getAddByIp(ip).then((res)=> {
        let newLog = new models.log({
            user: req.body.user,
            date: formatDateTime(new Date()),
            action: '退出',
            ip: ip,
            add: res,
        })
        newLog.save();
    })
})

module.exports = app;

