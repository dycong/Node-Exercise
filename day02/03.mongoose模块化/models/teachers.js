/**
 * 用来创建模型对象
 */

//引入mongoose数据库
const mongoose = require('mongoose');

//获取Schema模式对象
const Schema = mongoose.Schema;

//通过Schema模式对象创建约束对象
const teachersSchema = new Schema({
  name: String,
  age: Number,
  sex: {
    type: String,
    default:'男'
  },
  hobby: [String],
  phone: {
    type: String,
    unique: true,
    required:true
  },
  createTime: {
    type: Date,
    default:Date.now
  }
});

//创建模型对象 （集合名称，约束对象）
const Teachers = mongoose.model('Teachers', teachersSchema);

//暴露出去
module.exports = Teachers;