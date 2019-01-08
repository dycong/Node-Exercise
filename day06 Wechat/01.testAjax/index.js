const express = require('express');
const db = require('./db');
const Cities = require('./models/cities');
const app = express();

/*
  //找出所有省份的信息
  db.cities.find({level: 1})
  //找到河北省的所有市的信息
  db.cities.find({province: '13', level: 2})
  //找到河北省的石家庄市所有区县信息
  db.cities.find({province: '13',city: '01', level: 3})
 */
(async () => {
  // 等待连接完数据库之后设置
  await db;
  //让启动资源服务器和访问的服务器是同一个服务器，就不会有跨域问题
  app.use(express.static('public'));
  // 允许跨域
  // app.use((require,response,next) => {
  //   response.set('access-control-allow-origin','*');
  //   next();
  // });

  app.get('/province', async (require, response) => {
    try {
      // 获取所有的省份信息
      const province = await Cities.find({level: 1}, {province: 1, name: 1, _id: 0});
      // 返回响应 用户能通过状态码，知道响应是成功还是失败
      response.json({code: 1, data: province});
    } catch (e) {
      response.json({code: 0, data: '网络连接不稳定！~~~'});
    }
  });

  app.get('/city', async (require, response) => {
    try {
      // 获取请求参数
      const {province} = require.query;
      // 获取所选省份的所有城市信息
      const city = await Cities.find({level: 2, province}, {city: 1, name: 1, _id: 0});
      // 返回响应 用户能通过状态码，知道响应是成功还是失败
      response.json({code: 1, data: city});
    } catch (e) {
      response.json({code: 0, data: '网络连接不稳定！~~~'});
    }
  });

  app.get('/county', async (require, response) => {
    try {
      // 获取请求参数
      const {province, city} = require.query;
      // 获取所选省份的所有城市信息
      const county = await Cities.find({level: 3, province, city}, {county: 1, name: 1, _id: 0});
      // 返回响应 用户能通过状态码，知道响应是成功还是失败
      response.json({code: 1, data: county});
    } catch (e) {
      response.json({code: 0, data: '网络连接不稳定！~~~'});
    }
  });

})();

app.listen(3000, err => {
  if (!err) console.log('服务器连接成功');
  else console.log(err);
});
