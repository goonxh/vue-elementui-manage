const models = require('../db');
const express = require('express');
const formidable = require('formidable');
const app = express();
const {formatDateTime} = require('../utils');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');


app.post('/api/upload',(req,res)=>{
    let form = new formidable.IncomingForm();
    let targetFile = path.join(__dirname, '../upload');
    form.uploadDir = targetFile;
    form.parse(req, function (err, fields, files) {
        if(err) throw err;
        let oldpath = files.upload_img.path;
        let newpath = path.join(path.dirname(oldpath), files.upload_img.name);
        fs.rename(oldpath,newpath,(err)=>{
            if(err) throw err;
            let newFile = new models.upload({
                name: files.upload_img.name,
                path: '/upload/'+files.upload_img.name,
                date: formatDateTime(new Date()),
            })
            newFile.save();
            res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
            res.end('图片上传成功！');
        })
    })
})

app.get('/api/uploadPic',(req, res)=>{
    let page = parseInt(req.query.page), pageSize = parseInt(req.query.pageSize);
    let query = models.upload.find({});
    let pagination = {};
    models.upload.countDocuments({},function (error, data) {
        if(error) throw error;
        if(data){
            pagination.total = data;
            pagination.pageSize = pageSize;
            pagination.currentPage = page;
            query.sort({ date: -1}).skip((page-1)*pageSize).limit(pageSize).exec((error, data) => {
                if(error) throw error;
                if(data) {
                    res.json({data:data,pagination:pagination});
                }
            })
        }
    });
})


module.exports = app;