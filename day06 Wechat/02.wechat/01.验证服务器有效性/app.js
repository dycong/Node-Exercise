const express = require('express');
const sha1 = require('sha1');
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

const config = {
  token: 'dycong1996',
  appID: 'wxb169108b77efb232',
  appsecret: 'b5fc60021597cf1ecde9174f329fecf8'
};

//中间件能默认就接受处理所有请求
app.use((req, res, next) => {
  console.log(req.query);
  /*
  { signature: 'b1f6b5d3704661d93e6975365c3e3eb8035cbafd',  微信的加密签名，由timestamp、nonce、token三个参数加密生成的签名
  echostr: '8294158359329365487',  微信后台生成随机字符串
  timestamp: '1545720298',     时间戳，单位s
  nonce: '995051361' }         微信后台生成随机数字
   */

  // - 将timestamp、nonce、token三个参数组合成数组，按照字典序进行排序
  const {signature, echostr, timestamp, nonce} = req.query;
  const {token} = config;

  const sortedArr = [timestamp, nonce, token].sort();
  // - 将排序后的参数拼接在一起形成一个字符串，进行sha1加密，加密后得到的就是signature
  const sha1Str = sha1(sortedArr.join(''));
  console.log(sha1Str);
  // - 将加密后的签名和微信发送来的signature进行对比
  if (sha1Str === signature) {
    // - 一样，说明消息来自于微信服务器，返回echostr给微信服务器
    // end返回一个快速的响应
    res.end(echostr);
  } else {
    // - 不一样，说明消息不来自于微信服务器，返回error错误
    res.end('error');
  }
});

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});