const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

//应用第三方中间件  解析cookie数据，挂在到req.cookie上
app.use(cookieParser());

app.get('/cookie1', (require, response) => {
    response.cookie('userid', '123', {maxAge: 1000 * 3600 * 24});

    response.send('这是cookie1路由返回的响应')
});

app.get('/cookie2', (require, response) => {
    console.log(require.cookies);

    response.send('这是cookie2路由返回的响应')
});

app.get('/cookie3', (require, response) => {
    response.clearCookie('userid');

    response.send('这是cookie3路由返回的响应')
});


app.listen(3000, err => {
    if (!err) console.log('服务器开启成功');
    else console.log(err);
});