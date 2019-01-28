// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
// 连接数据库 如果不自己创建 默认test数据库会自动生成
const options = {
    user:"root",
    pass:"2012011234"
}
//远程连接
mongoose.connect('mongodb://104.225.154.24:27017/vueDemo');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',(err) => console.log('Mongo connection error:'+err));
db.once('open',() => console.log('Mongo connection successed'));

/************** 定义模式 Schema**************/

/**
 * user 表
 */
const userSchema = mongoose.Schema({
    username: {
        unique: true,
        type: String,
    },
    name: String,
    password: String,
    role: String,
    email: {
        unique: true,
        type: String,
    },
})
userSchema.pre('save', function(next){
    let user = this;
    // 进行加密（加盐）
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});
userSchema.pre('update', function(next){
    let user = this._update;
    // 进行加密（加盐）
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    })
}

/**
 * log 表
 */
const logSchema = mongoose.Schema({
    action: String,  //动作：登录、退出
    user: String, //操作用户
    date: String, //操作时间
    ip: String,
    add: String,
})

/**
 *  upload 文件地址表
 */
const uploadSchema = mongoose.Schema({
    name: String,  //文件名称
    path: String, //文件路径
    date: String, //上传时间
})

/************** 定义模型Model **************/
const Models = {
    user : mongoose.model('user',userSchema),
    log : mongoose.model('log',logSchema),
    upload : mongoose.model('upload',uploadSchema),
}

module.exports = Models;
