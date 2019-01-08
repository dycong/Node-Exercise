/**
 * Buffer
 */

const buf = Buffer.allocUnsafe(10);

// console.log(buf); //<Buffer d0 59 54 40 01 00 00 00 01 00>
// console.log([]);
// console.log(function(){});
      
// console.log(buf[0]);
// buf[1] = 123;
// console.log(buf);
// buf.forEach((item, index) => {
//   console.log(item, index);
// });

   const str = 'hello world';
const buf1 = Buffer.from(str)
console.log(buf1);
console.log(buf1.toString());
