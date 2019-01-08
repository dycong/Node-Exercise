/**
 * 此模块用来连接数据库
 */
//引入mongoose模块
const mongoose = require('mongoose');

//异步
const promise = new Promise((resolve,reject) => {
  //连接mongoose数据库
  mongoose.connect('mongodb://localhost:27017/test2', { useNewUrlParser: true });
  //绑定监听事件
  mongoose.connection.once('open', err => {
    if (!err) {
      console.log('数据库连接成功');
      resolve();
    } else {
      reject(err);
    }
  })
});

//暴露出去
module.exports = promise;