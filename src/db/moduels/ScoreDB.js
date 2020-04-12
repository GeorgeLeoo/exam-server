import Scores from "../../model/scores";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询分数
 * @param query
 * @returns {Promise<unknown>}
 */
export const getScores = function (query) {
	return new Promise((resolve) => {
		Scores.find(query.condition, (err, scores) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: scores });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建分数
 * @param body
 * @returns {Promise<unknown>}
 */
export const createScore = function (body) {
	return new Promise((resolve) => {
		Scores.insertMany(body, (err, scores) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新分数
 * @param body
 * @returns {Promise<unknown>}
 */
export const updateScore = function (body) {
	return new Promise((resolve) => {
		Scores.updateOne(body.query, { $set: body.update }, (err, scores) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			if (scores.nModified === 1) {
				resolve({
					code: ResponseCode.SERVICE_ERROR,
					msg: "更新成功",
					data: [],
				});
			} else {
				resolve({
					code: ResponseCode.SUCCESS,
					msg: "更新失败",
					data: [],
				});
			}
		});
	});
};

/**
 * 删除分数
 * @param query
 * @returns {Promise<unknown>}
 */
export const deleteScore = function (query) {
	return new Promise((resolve) => {
		Scores.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, scores) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (scores.nModified === 1) {
					resolve({
						code: ResponseCode.SUCCESS,
						msg: "删除成功",
						data: [],
					});
				} else {
					resolve({
						code: ResponseCode.SERVICE_ERROR,
						msg: "删除失败",
						data: [],
					});
				}
			}
		);
	});
};
