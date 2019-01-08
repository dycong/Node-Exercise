//引入mongoose模块
const mongoose = require('mongoose');

//异步操作
const promise = new Promise((resolve, reject) => {
  //连接mongoose数据库
  mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true });
  // 绑定事件监听
  mongoose.connection.on('open', err => {
    if (!err) {
      console.log('数据库连接成功');
      resolve();
    } else {
      console.log(err);
      reject();
    }
  })
});

promise
  .then(async () => {
    //获取Schema模式对象
    const Schema = mongoose.Schema;
    // 通过模式对象来创建约束对象(集合中文档进行约束)
    // 约束属性名 和 属性值的类型
    const studentsSchema = new Schema({
      name: String,  //要求集合中的文档，有个字段叫 name，值的类型为 String
      age: Number,
      sex: {
        type: String, // 类型为 String
        default: '男' // 默认值
      },
      hobby: [String],
      phone: {
        type: String,
        unique: true // 唯一值
      },
      createTime: {
        type: Date,
        default: Date.now
      }
    });

    //model模型对象
    const Students = mongoose.model('students', studentsSchema);

    //create一条文档数据
    /**
     * 
     Students.create({
       name: 'Tom',
       age: 22,
       sex: '男',
       hobby: ['Jerry'],
       phone: '120'
      }, err => {
        if (!err) {
          console.log('文档创建成功');
        } else {
          console.log(err);
        }
      })
       */

    //await  create一条文档数据
    /**
     * 
     await Students.create({
       name: 'Jerry',
       age: 16,
       sex: '女',
       hobby: ['Tom'],
       phone: '520'
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      */
    //同时添加多条文档数据
    // const data = [{
    //   name: ' mike',
    //   age: 22,
    //   hobby: ['marin'],
    //   phone: '112'
    // }, {
    //   name: 'marin',
    //   age: 21,
    //   sex: '女',
    //   hobby: ['mike'],
    //   phone: '212'
    // }]
    // Students.insertMany(data, err => {
    //   if (!err) {
    //     console.log('数据添加成功');
    //   } else {
    //     console.log(err);
    //   }
    // })
    
    const result =await Students.find({ age:{$lte:20} });
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  })
