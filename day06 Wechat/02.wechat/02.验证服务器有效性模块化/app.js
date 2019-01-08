const express = require('express');
const handleRequest = require('./wechat/handleRequest');
const app = express();
/*
    1、在测试号管理页面填写服务器
      - 服务器地址 url
        服务器地址要求万维网能访问的地址。
        ngrok 内网穿透，将本地localhost：3000 映射为外网能访问的网址
          - 启动 ngrok客户端
          - 输入指令 ngrok HTTP 3000
      - Token 参与微信签名加密的一个字段，越复杂越好
    2、验证消息来自于微信服务器
      - 将timestamp、nonce、token三个参数组合成数组，按照字典序进行排序
      - 将排序后的参数拼接在一起，形成一个字符串，进行sha1加密，加密后得到的就是signature
      - 将加密后的签名和微信发送来的signature进行对比
        - 一样，消息来源于微信服务器，返回echostr给服务器
        - 不一样，消息不来自服务器，返回error错误
 */
app.use(express.urlencoded({extended:true}));
// 中间件默认接受处理所有请求
app.use(handleRequest());

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});