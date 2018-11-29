const models = require('../db');
const express = require('express');
const app = express();

/**
 * 获取log列表
 */
app.get('/api/log',function (req, res) {
    let page = parseInt(req.query.page), pageSize = parseInt(req.query.pageSize);
    let query = models.log.find({});
    let pagination = {};
    models.log.countDocuments({},function (error, data) {
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