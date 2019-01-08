
module.exports = message => {
  let options = {
    msgType: 'text',
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName,
    createTime: Date.now(),
    content: ''
  };
  if(message.MsgType === 'text'){
    // 用户发送的是文本消息
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
  }else if(message.MsgType === 'image'){
    // 用户发送的图片消息
    options.msgType = 'image';
    options.mediaId = message.MediaId;
  }else if(message.MsgType === 'voice'){
    // 用户发送的语音消息
    options.content = `语音识别结果为:${message.Recognition}`
  }else if(message.MsgType === 'location'){
    /*
    用户发送的地理位置消息
     */
    options.content = `地理位置纬度为:${message.Location_X};地理位置经度:${message.Location_Y};地图缩放大小:${message.Scale};地理位置信息${message.Label}`
  }else if(message.MsgType === 'event'){
    if(message.Event === 'subscribe'){
      //  订阅公众号事件
      options.content = '谢谢关注!~';
      if(message.EventKey){
        options.content = '扫描二维码，欢迎关注！~';
      }
    }else if(message.Event === 'unsubscribe'){
      console.log('无情取关!');
    }
    // else if(message.Event === 'LOCATION'){
    //   //  用户上报地理位置，当用户关注公众号时，会询问是否上报地理位置，如果允许才会触发事件
    //   options.content = `地理位置纬度为:${message.Latitude};地理位置经度:${message.Longitude};地理位置信息${message.Precision}`
    // }
    else if(message.Event === 'CLICK'){
      // 用户点击菜单按钮
      options.content = `菜单key:${message.EventKey}`;
    }
  }
  return options;
};
