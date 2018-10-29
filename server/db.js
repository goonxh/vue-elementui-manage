// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
// 连接数据库 如果不自己创建 默认test数据库会自动生成
const options = {
    user:"xh",
    pass:"2012011234"
}
//远程连接
mongoose.connect('mongodb://47.106.141.98:27017/vueDemo', options);

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',(err) => console.log('Mongo connection error:'+err));
db.once('open',() => console.log('Mongo connection successed'));

/************** 定义模式 Schema**************/

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
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    })
}
/************** 定义模型Model **************/
const Models = {
    user : mongoose.model('user',userSchema),
}

module.exports = Models;
