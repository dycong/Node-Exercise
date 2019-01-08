const express = require('express');

const app = express();

//将指定目录暴露出去
app.use(express.static('public'));

app.use(express.urlencoded({}))

app.get('/ajax', (require, response) => {
    // 打印请求参数
    console.log(require.query);

    response.send({name:'孙悟空',age:18});
});


app.listen(3000, err => {
    if (!err) console.log('服务器开启成功');
    else console.log(err);
});