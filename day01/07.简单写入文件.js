/**
 * fs node核心模块
 * 
 * 简单写入文件
 *   fs.writeFile(path, string[, option], callback)
 *    - path 文件路径
 *    - string 写入的内容
 *    - option 可选值  使用默认值
 *    - callback 回调函数
 *      - error 错误对象
 */

const fs = require('fs');

//简单写入文件
fs.writeFile('./a.txt', '今个儿老百姓啊!!!', err => {
  if (!err) {
    console.log(err);
    console.log('写入成功');
  } else {
    console.log(err);
  }
})