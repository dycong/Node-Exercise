/*
主模块
    默认情况下，js模块的内容是对外不可见，
    需要使用，就需要暴露出来

CommonJS 模块；它可能会转换为 ES6 模块

  暴露模块内容
    module.exports
        module.exports = xxx;
        module.exports.xxx = xxx;
    exports
        exports.xxx = xxx;


        module.exports = ｛｝;
        exports = module.exports

        模块向外暴露出去的内容，实际上就是module.exports的值指向的内容

  引入其他模块
    require('模块的相对路径')
    
*/

const m1 = require("../day02/module1");

const m2 = require("../day02/module2");

console.log(m1);
console.log(m2);

console.log(m1(2, 3));
console.log(m2.mul(2, 3));
