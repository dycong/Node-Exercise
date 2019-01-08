//引入express模块
const express = require('express');

//创建app对象
const app = express();

app.get('/login', (request, response) => {
  response.send('这是login路由返回的响应');
})

app.get('/register', (request, response) => {
  response.send('这是register路由返回的响应');
})

app.get('/hotal/:id', (request, response) => {
  console.log(request.params);
  response.send('这是hotal路由返回响应');
})


//监听端口号
app.listen(3000, err => {
  if (!err) console.log('服务器请求成功');
  else console.log(err);
})
