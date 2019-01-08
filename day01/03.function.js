/**
 * 每个js文件都是一个模块，每一个模块默认都包裹一层函数
 * function (exports, require, module, __filename, __dirname) {}
 */

// console.log(arguments.callee.toString());

console.log(__filename);//当前文件的绝对路径
console.log(__dirname);//当前文件夹的绝对路径
