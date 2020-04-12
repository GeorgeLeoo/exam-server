import db from './../db/conn'
const Schema = db.Schema

/**
 * 多选题
 */
const Multiples = new Schema({
  question: String,
  subjectId: String,
  knowledgePoint: String,
  pic: String,
  a: String,
  b: String,
  c: String,
  d: String,
  correctAnswer: Array,
  explanation: String,
  difficulty: String,
  adminId: String,
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

module.exports = db.model('Multiple', Multiples)
