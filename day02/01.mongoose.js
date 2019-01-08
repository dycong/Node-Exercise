//引入mongoose模块
const mongoose = require('mongoose');

//链接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/mongoose_test');

//绑定事件监听
mongoose.connection.on("open", err => {
  if (!err) {
    console.log('数据库连接成功了');
    resolve();
  } else {
    console.log(err);
    reject();
  }
})

/**
 * 1.创建schema
 * 2.创建model
 * 3.创建document
 */
//获取schema模式对象
const Schema = mongoose.Schema;
//通过模式对象来创建约数对象(集合中文档进行约束)
const studnetsSchema = new Schema({
  name: String,
  age: Number,
  sex: {
    type: String,
    default: '男'   //默认值
  },
  hobby: [String], //值是数组，数组中的元素要求是字符串
  phone: {
    type: String,
    unique: true   //唯一值
  },
  createTime: {
    type: Date,
    dafault: Date.now
  }
});

//创建model 模型对象
/**
   * mongoose.model(集合名称(复数形式), 约束对象)
   */
const Students = mongoose.model('students', studnetsSchema);

//创建单个文档对象
//通过模型对象创建文档对象，注意数据并没有保存

const s1 = new Students({
  name: 'jack',
  age: 20,
  hobby: ['rose'],
  phone: '12345678900'
});

s1.save();

