/*
access_token
  1、是什么？ 全局唯一接口调用凭据
  2、用于接口调用的一个必要参数
  3、特点：
     - 有效期为2小时，2小时需要更新一次,提前5分钟更新，能确保后续正常使用
     - 重复获取会导致上一次的失败
     - 接口调用有限制
   4、请求地址
        https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
   5、请求方式
        GET
   6、请求成功的返回值
        {"access_token":"ACCESS_TOKEN","expires_in":7200}
   7、设计思路
        - 第一次：发送请求，获取access_token，保存下来
        - 第二次：读取上一次保存的值，判断是否过期
            - 过期，重新发送请求，获取access_token，保存下来
            - 没有过期，直接使用
    8、整理
        - 上来就读取保存的值（readAccessToken）
            - 有值
              判断是否过期(isValidAccessToken)
                - 过期，重新发送请求，获取access_token（getAccessToken），保存下来（saveAccessToken）
                - 没有过期，直接使用
            - 没有值
               发送请求，获取access_token（getAccessToken），保存下来（saveAccessToken）
 */
const {appID, appsecret} = require('../config');
const rp = require('request-promise-native');
const {writeFile, readFile} = require('fs');
const menu = require('./menu');
const api = require('../utils/api')

class Wechat {
  // async默认返回值是一个promise对象
  /**
   * 获取access_token的方法
   * @returns {Promise<void>}
   */
  async getAccessToken() {
    //  定义请求地址
    const url = `${api.accessToken}appid=${appID}&secret=${appsecret}`;
    //    发送请求  request  request-promise-native
    const result = await rp({
      method: 'GET', //请求方式
      url,//请求地址
      json: true //将相应回来的数据自动转换为js对象返回
    });

    console.log(result);
    // 重写了过期时间，提前5分钟刷新
    result.expores_in = Date.now() + 7200000 - 300000;
    // 将最终有效的access_token返回出去
    return result;
  }

  /**
   * 保存access_token方法
   * @param accessToken
   */
  saveAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      // 写入文件时没法写入对象/数组/函数等类型
      // 需要将其转换为json字符串保存
      writeFile('./accessToken.txt', JSON.stringify(accessToken), err => {
        if (!err) {
          resolve();
        } else {
          reject('saveAccessToken方法出错：' + err);
        }
      });
    })
  }

  /**
   * 读取access_token的方法
   */
  readAccessToken() {
    return new Promise((resolve, reject) => {
      readFile('./accessToken.txt', (err, data) => {
        if (!err) {
          resolve(JSON.parse(data.toString()));
        } else {
          reject(err);
        }
      })
    })
  }

  /**
   * 判断access_token是否过期
   * @param expires_in
   * @returns {boolean}
   */
  isValidAccessToken({expires_in}) {
    // if (expires_in > Date.now()) {
    //     //没有过期
    //     return true;
    // } else {
    //     //过期
    //     return false;
    // }
    return expires_in > Date.now();
  }

  /**
   * 得到一个有效access_token
   * @returns {Promise<access_token>}
   */
  fetchAccessToken() {
    if (this.access_token && this.isValidAccessToken(this)) {
      //  判断this上有access_token，并且没有过期，直接使用
      return Promise.resolve({access_token: this.access_token, expires_in: this.expires_in})
    }
    // console.log(this);  // 实例对象
    return this.readAccessToken()
    .then(async res => {
      if (this.isValidAccessToken(res)) {
        //    没有过期
        return res;
      } else {
        //    过期
        const result = await this.getAccessToken();
        await this.saveAccessToken(result);
        return result;
      }
    })
    .catch(async err => {
      const result = await this.getAccessToken();
      await this.saveAccessToken(result);
      return result;
    })
    .then(res => {
      this.access_token = res.access_token;
      this.expires_in = res.expires_in;
      return Promise.resolve(res);
    })
  }

  /**
   * 创建菜单的方法
   * @param body
   * @returns {Promise<void>}
   */
  async createMenu(body) {
    //  获取access_token
    const {access_token} = await this.fetchAccessToken();
    //  定义请求地址
    const url = `${api.menu.create}access_token=${access_token}`;
    //  发送请求
    const result = rp({method: 'POST', url, json: true, body});

    return result;
  }

  /**
   * 删除菜单的方法
   * @returns {Promise<void>}
   */
  async deleteMenu() {
    //  获取access_token
    const {access_token} = await this.fetchAccessToken();
    //  定义请求地址
    const url = `${api.menu.delete}access_token=${access_token}`;
    //  发送请求
    const result = rp({method: 'GET', url, json: true});
  }
}

// 测试
(async () => {
  const w = new Wechat();
  let result = await w.deleteMenu(menu); // undefined
  console.log(result);
  result = await w.createMenu(menu); //{ errcode: 0, errmsg: 'ok' }
  console.log(result);
})();