const sha1 = require('sha1');
const {token} = require('../config');

// module.exports = (req, res, next) => {
//   const {signature, echostr, timestamp, nonce} = req.query;
//   const sha1Str = sha1([timestamp, nonce, token].sort().join(''));
//   if (sha1Str === signature) res.end(echostr);
//   else res.end('error');
// };

module.exports = () => {
  return (req, res, next) => {
    const {signature, echostr, timestamp, nonce} = req.query;
    const sha1Str = sha1([timestamp, nonce, token].sort().join(''));
    /*
    验证服务器有效性是get请求
    用户发送的消息是post请求
     */
    if (req.method === 'GET') {
      if (sha1Str === signature) res.end(echostr);
      else res.end('error');
    } else if (req.method === 'POST') {
      //  用户发送的消息是post请求
      //  验证消息来自于微信服务器
      //  如果是其他服务器 或前端发送来的请求，不接受
      if (sha1Str !== signature) res.end('error');

      //确认来自微信服务器  接收用户消息
      let result = '';

      req
        .on('data', data => {
          console.log(data.toString());
          result += data.toString();
          /*
          <xml>
            <ToUserName><![CDATA[gh_49cf19da6854]]></ToUserName> 开发者微信号
            <FromUserName><![CDATA[okVxU5_NokBcGghmvpVOSNkJJMrk]]></FromUserName>  发送者openid
            <CreateTime>1545786173</CreateTime>  时间戳
            <MsgType><![CDATA[text]]></MsgType> 消息类型
            <Content><![CDATA[123]]></Content>  消息具体内容
            <MsgId>6639101060077661697</MsgId>  消息id，会保存3天
          </xml>
           */
        })

      console.log(result);
    } else {
      res.end('error')
    }

  }
};