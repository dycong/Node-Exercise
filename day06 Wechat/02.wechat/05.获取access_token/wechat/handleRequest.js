const sha1 = require('sha1');
const {token} = require('../config');
const {getUserDataAsync, parseXMLData, formatMessage} = require('../utils/tools');
const template = require('../reply/template');
const reply = require('../reply/reply');

module.exports = () => {
    return async (req, res, next) => {
        const {signature, echostr, timestamp, nonce} = req.query;
        const sha1Str = sha1([timestamp, nonce, token].sort().join(''));
        // 验证服务器有效性是get请求
        // 用户发送的消息是post请求
        if (req.method === 'GET') {
            if (sha1Str === signature) res.end(echostr);
            else res.end('error');
        } else if (req.method === 'POST') {
            //  用户发送的消息是post请求
            //  验证消息来自于微信服务器
            if (sha1Str !== signature) res.end('error');
            //接收用户消息
            const xmlData = await getUserDataAsync(req);
            // 将xml数据转换为json对象，今后操作更加方便
            const jsData = parseXMLData(xmlData);
            // 将js对象处理为一个更好操作的对象，格式化数据
            const message = formatMessage(jsData);
            // 根据用户发送的消息，进行回复
            // 返回给用户的信息必须是xml格式数据
            const options = reply(message);
            /*
              错误：该公众号出现故障，请稍后再试。
              原因：最终响应给用户的数据不是一个标准的xml格式
              调试：打印replyMessage，对照字段是否按照指定格式填写的
             */
            const replyMessage = template(options);

            res.end(replyMessage);

        } else {
            res.end('error')
        }
    }
};