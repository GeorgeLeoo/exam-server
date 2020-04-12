import Judges from "../../model/judges";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询判断题
 * @param query
 * @returns {Promise<unknown>}
 */
export const getJudges = function (query) {
	return new Promise((resolve) => {
		Judges.find(query.condition, (err, judges) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: judges });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建判断题
 * @param body
 * @returns {Promise<unknown>}
 */
export const createJudge = function (body) {
	return new Promise((resolve) => {
		Judges.insertMany(body, (err, judges) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新判断题
 * @param body
 * @returns {Promise<unknown>}
 */
export const updateJudge = function (body) {
	return new Promise((resolve) => {
		Judges.updateOne(body.query, { $set: body.update }, (err, judges) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			if (judges.nModified === 1) {
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
 * 删除判断题
 * @param query
 * @returns {Promise<unknown>}
 */
export const deleteJudge = function (query) {
	return new Promise((resolve) => {
		Judges.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, judges) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (judges.nModified === 1) {
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
