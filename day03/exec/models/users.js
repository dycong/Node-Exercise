//连接mongoose模块
const mongoose = require('mongoose');

//创建模式对象
const Schema = mongoose.Schema;

// 创建约束对象
const usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required:true
  },
  psw: {
    type: String,
    required:String
  },
  email: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model('user', usersSchema);