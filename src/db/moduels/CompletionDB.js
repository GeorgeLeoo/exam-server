import Completions from "../../model/completions";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询填空题
 * @param query
 * @returns {Promise<unknown>}
 */
export const getCompletions = function (query) {
	return new Promise((resolve) => {
		Completions.find(query.condition, (err, completions) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: completions });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建填空题
 * @param body
 * @returns {Promise<unknown>}
 */
export const createCompletion = function (body) {
	return new Promise((resolve) => {
		Completions.insertMany(body, (err, completions) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新填空题
 * @param body
 * @returns {Promise<unknown>}
 */
export const updateCompletion = function (body) {
	return new Promise((resolve) => {
		Completions.updateOne(
			body.query,
			{ $set: body.update },
			(err, completions) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (completions.nModified === 1) {
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
			}
		);
	});
};

/**
 * 删除填空题
 * @param query
 * @returns {Promise<unknown>}
 */
export const deleteCompletion = function (query) {
	return new Promise((resolve) => {
		Completions.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, completions) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (completions.nModified === 1) {
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
