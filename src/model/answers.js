import db from './../db/conn'
const Schema = db.Schema

/**
 * 考生答案
 */
const Answers = new Schema({
  /**
   * [
   *  {
   *    id: ''  题目的id
   *    userAnswer: ''  考生的答案
   *  }
   * ]
   */
  single: {
    type: Array,
    default: []
  },
  multiple: {
    type: Array,
    default: []
  },
  judge: {
    type: Array,
    default: []
  },
  completion: {
    type: Array,
    default: []
  },
  afq: {
    type: Array,
    default: []
  },
  studentId: String,
  paperId: String,
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

module.exports = db.model('Answers', Answers)
