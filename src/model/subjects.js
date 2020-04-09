import db from './../db/conn'
const Schema = db.Schema
const Subjects = new Schema({
  name: String,
  desc: String,
  author: String,
  /**
   * 数据状态
   * 0 表示存在
   * 1 表示删除
   * 默认 0
   */
  isDelete: {
    type: Number,
    default: 0
  },
  /**
   * 创建时间
   */
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = db.model('Subjects', Subjects)
