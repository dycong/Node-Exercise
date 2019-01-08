//node 核心模块 / 自带模块
const http = require('http');

//node 核心模块 / 自带模块
const querystring = require('querystring');

//通过http模块的方法来创建服务
const server = http.createServer((request, response) => {
  /**
   * request 请求对象，发送请求携带的信息内容
   * response 响应对象，返回响应携带的信息内容
   */

  //接收请求参数
  // 以？开头，查询字符串
  console.log(request.url); //  /?userName=dycong&psw=123456

  //将请求参数解析为对象格式
  const url = request.url;
  const query = url.split('?')[1];
  const data = querystring.parse(query);
  console.log(data);  // {userName: 'dycong', psw: '123456' }

  //服务器告诉浏览器，使用utf-8解码
  response.setHeader('content-type', 'text/html;charset=utf8');

  //返回响应
  response.end('<h1>这是nodejs服务器返回的响应</h1>')
});

//监听端口号，启动服务
//访问路径：http://localhost:3000
server.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})


/**
 *       //引入http模块
      const http = require('http');

      //引入querystring模块
      const querystring = require('querystring');

      //
      const servers = http.createServer((request, response) => {

        console.log(request.url);

        const url = request.url;
        const query = url.split('?')[1];
        const data = querystring.parse(query);
        console.log(data);

        //设置头部
        response.setHeader('content-type','text/html;charset=utf8')

        //返回响应
        response.end('<h1>这是nodejs服务器返回的响应</h1>')
      })


      //监听端口号，启动服务
      servers.listen(3000, err => {
        if (!err) console.log('请求成功');
        else console.log(err);
      })
 */
