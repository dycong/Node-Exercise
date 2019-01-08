/**
 * 主模块，也叫入口文件
 * 命名：app ，index ，main
 */

//引入db模块  index.js可以省略
// const db = require('./db'); 
const db = require('./db/index');

//引入模型对象模块
const teachers = require('./models/teachers');

// 使用模块
db
  .then(async () => {
    const result = await teachers.create({
      name: 'Ming',
      age: 22,
      hobby:['Hong'],
      phone:'18333333333'
    })
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  })
