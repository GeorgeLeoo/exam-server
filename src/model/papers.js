import db from './../db/conn'
const Schema = db.Schema

/**
 * 试卷
 */
const Papers = new Schema({
  adminId: String,
  testType: String,
  name: String,
  subjectId: String,
  startTime: String,
  endTime: String,
  durationTime: String,
  difficulty: String,
  attention: String,
  paperType: String,
  count: String,
  total: String,
  singleNumber: String,
  singleScore: String,
  multipleNumber: String,
  multipleScore: String,
  judgeNumber: String,
  judgeScore: String,
  completionNumber: String,
  completionScore: String,
  afqNumber: String,
  afqScore: String,
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

module.exports = db.model('Papers', Papers)
