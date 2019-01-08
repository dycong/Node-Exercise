//引入express模块
const express = require('express');

//创建app应用对象
const app = express();

//写业务逻辑：处理请求，返回响应的设置
app.get('/', (request, response) => {
  // 处理请求的回调函数
  // 接收请求参数
  console.log(request.query);
  
  // 返回响应
  response.send('<h1>这是express中服务器返回的响应</h1>')
})

// 监听端口号：端口号有且只能运行一个
app.listen(3000, err => {
  if (!err) {
    console.log('服务器启动成功了'); 
  } else {
    console.log(err);
  }
})



/**
   * // 引入express模块
  const express = require('express');

  // 创建app对象
  const app = express();

  app.get('/', (request, response) => {

    console.log(request.query);

    response.send('<h1>这是express中服务器返回的响应</h1>')
  })



  //监听端口号
  app.listen(3000, err => {
    if (!err) console.log('服务器启动成功');
    else console.log(err);
  })
 */