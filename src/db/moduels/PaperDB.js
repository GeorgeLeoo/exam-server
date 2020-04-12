import Papers from "../../model/papers";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询试卷
 * @param query
 * @returns {Promise<unknown>}
 */
export const getPapers = function (query) {
	return new Promise((resolve) => {
		Papers.find(query.condition, (err, papers) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: papers });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建试卷
 * @param body
 * @returns {Promise<unknown>}
 */
export const createPaper = function (body) {
	return new Promise((resolve) => {
		Papers.insertMany(body, (err, papers) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新试卷
 * @param body
 * @returns {Promise<unknown>}
 */
export const updatePaper = function (body) {
	return new Promise((resolve) => {
		Papers.updateOne(body.query, { $set: body.update }, (err, papers) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			if (papers.nModified === 1) {
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
 * 删除试卷
 * @param query
 * @returns {Promise<unknown>}
 */
export const deletePaper = function (query) {
	return new Promise((resolve) => {
		Papers.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, papers) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (papers.nModified === 1) {
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
