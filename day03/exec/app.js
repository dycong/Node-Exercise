// 连接express模块
const express = require('express');
// 连接db文件夹
const db = require('./db');
// 连接users文件
const users = require('./models/users');

const app = express();

// 业务逻辑
// 引入内置中间件,暴露静态资源
app.use(express.static('public'));

// 引入内置中间件，解析请求体资源
app.use(express.urlencoded({extended: true}));


// 注册
app.post('/register', (req, response) => {
  // console.log(req.body);
  /**
   * 1、获取用户提交的表单数据 request.body
   * 2、对数据进行正则验证（验证数据是否符合规范）
   * 3、监测用户名是否已存在 创建数据库，Users.findOne()  L
   * 4、保存在数据库中 Users.create()
   *  不管注册成功或注册失败，都要返回响应 res.send()
   */
    
    // * 1、获取用户提交的表单数据 request.body
  const {username, pwd, repwd, email} = req.body;
  
  //  * 2、对数据进行正则验证（验证数据是否符合规范）
  // 创建正则规则
  const usernameReg = /^[a-zA-Z0-9_]{5,13}$/; //用户名包含英文字符、数字、下划线，长度
  const pwdReg = /^[a-zA-Z0-9_]{5,16}$/; //密码包含英文字符、数字、下划线，长度
  const emailReg = /^[a-zA-Z0-9_]{3,10}@[a-zA-Z0-9_]{2,5}\.com$/; //邮箱包含英文字符、数字、下划线，长度
  
  // 验证正则 test()
  if (!usernameReg.test(username)) {
    req.send('用户名格式不正确');
    return;
  } else if (!pwdReg.test(pwd)) {
    req.send('密码格式不正确');
    return;
  } else if (pwd !== repwd) {
    req.send('两次密码不一致，请重新输入');
    return;
  } else if (!emailReg.test(email)) {
    req.send('邮箱格式不正确');
    return;
  }
  
  // * 3、监测用户名是否已存在 创建数据库，Users.findOne()
  // * 4、保存在数据库中 Users.create()
})


// 登录
app.post('/login', (request, response) => {

})


app.listen(3000, err => {
  if (!err) console.log('服务器启动成功');
  else console.log(err);
})