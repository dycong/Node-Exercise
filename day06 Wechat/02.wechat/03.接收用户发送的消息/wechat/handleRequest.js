const sha1 = require('sha1');
const {token} = require('../config');
const {getUserDataAsync, parseXMLData, formatMessage} = require('../utils/tools');

// module.exports = (req, res, next) => {
//   const {signature, echostr, timestamp, nonce} = req.query;
//   const sha1Str = sha1([timestamp, nonce, token].sort().join(''));
//   if (sha1Str === signature) res.end(echostr);
//   else res.end('error');
// };

module.exports = () => {
  return async (req, res, next) => {
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

      //接收用户消息
      const xmlData = await getUserDataAsync(req);
      // console.log(xmlData);
      // 将xml数据转换为json对象，今后操作更加方便
      const jsData = parseXMLData(xmlData);
      // console.log(jsData);
      /*
      { xml:
       { ToUserName: [ 'gh_49cf19da6854' ],
         FromUserName: [ 'okVxU5_NokBcGghmvpVOSNkJJMrk' ],
         CreateTime: [ '1545808719' ],
         MsgType: [ 'text' ],
         Content: [ '555' ],
         MsgId: [ '6639197894410317336' ]
        }
       }
       */
      // 将js对象处理为一个更好操作的对象，格式化数据
      const message = formatMessage(jsData);
      // console.log(message);

      // 根据用户发送的消息，进行回复
      // 返回给用户的信息必须是xml格式数据
      let options = {
        msgType: 'text',
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.now(),
        content: ''
      };
      if (message.Content === '1') {
        options.content = 'Merry Christmas'
      } else {
        options.msgType = 'news';
        options.content = [{
          title:'佛系少年',
          description:'dyconggggg',
          picUrl:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=641530613,3905033669&fm=58&bpow=649&bpoh=362',
          url:'http://www.baidu.com'
        }];
      }

      let replyMessage = `<xml>  
          <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
          <FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
          <CreateTime>${options.createTime}</CreateTime>
          <MsgType><![CDATA[${options.msgType}]]></MsgType>`;

      if (options.msgType === 'text') {
        replyMessage += `<Content><![CDATA[${options.content}]]></Content>`;
      } else if (options.msgType === 'image') {
        replyMessage += `<Image><MediaId><![CDATA[${options.mediaId}]]></MediaId></Image>`;
      } else if (options.msgType === 'voice') {
        replyMessage += `<Voice><MediaId><![CDATA[${options.mediaId}]]></MediaId></Voice>`
      } else if (options.msgType === 'video') {
        replyMessage += `<Video>
          <MediaId><![CDATA[${options.mediaId}]]></MediaId>
          <Title><![CDATA[${options.title}]]></Title>
          <Description><![CDATA[${options.description}]]></Description>
          </Video>`
      } else if (options.msgType === 'music') {
        replyMessage += `<Music>
          <Title><![CDATA[${options.title}]]></Title>
          <Description><![CDATA[${options.description}]]></Description>
          <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
          <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
          <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
          </Music>`
      } else if (options.msgType === 'news') {
        replyMessage += `<ArticleCount>${options.content.length}</ArticleCount>
          <Articles>`;
        options.content.forEach(item => {
          replyMessage += `<item>
                <Title><![CDATA[${item.title}]]></Title> 
                <Description><![CDATA[${item.description}]]></Description>
                <PicUrl><![CDATA[${item.picUrl}]]></PicUrl>
                <Url><![CDATA[${item.url}]]></Url>
                </item>`;
        });
        replyMessage += `</Articles>`;
      }
      replyMessage += `</xml>`;

      // 检查回复的消息是否符合规范
      console.log(replyMessage);
      res.end(replyMessage);

    } else {
      res.end('error')
    }

  }
};