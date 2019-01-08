/*
用来定义接口地址
 */
const prefix = 'https://api.weixin.qq.com/cgi-bin/';

module.exports = {
  accessToken: `${prefix}token?grant_type=client_credential&`,
  menu: {
    create: `${prefix}menu/create?`,
    delete: `${prefix}menu/delete?`
  },
  tags:{
    create: `${prefix}tags/create?`,
    get:`${prefix}tags/get?`,
    update:`${prefix}tags/update?`,
    delete:`${prefix}tags/delete?`
  },
  user:{
    getUsers:`${prefix}user/tag/get?`,
    batchTag:`${prefix}user/members/batchtagging?`,
    getInfo:`${prefix}user/info?lang=zh-CN&`,
    get:`${prefix}user/get?`
  }
};