const {parseString} = require('xml2js');

module.exports = {
  getUserDataAsync(req) {
    return new Promise((resolve, reject) => {
      let result = '';
      req
        .on('data', data => {
          // console.log(data.toString());
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
        .on('end', () => {
          //数据接收完毕后接收的事件
          resolve(result);
        })
    });
  },

//  解析xml数据
  parseXMLData(xmlData) {
    let jsData = '';
    parseString(xmlData, {trim: true}, (err, result) => {
      if (!err) {
        jsData = result;
      }
    });
    return jsData;
  },

  formatMessage({xml}) {
    //  1、去掉xml 2、去掉数组
    //  操作数据是，尽量的不影响原数据
    let message = {};

    for (let key in xml) {
      const value = xml[key];
      message[key] = value[0];
    }
    return message;
  }
};