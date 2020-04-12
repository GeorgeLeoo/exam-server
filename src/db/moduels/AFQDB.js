import AFQs from "../../model/afqs";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询解答题
 * @param query
 * @returns {Promise<unknown>}
 */
export const getAFQs = function (query) {
	return new Promise((resolve) => {
		AFQs.find(query.condition, (err, afqs) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: afqs });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建解答题
 * @param body
 * @returns {Promise<unknown>}
 */
export const createAFQ = function (body) {
	return new Promise((resolve) => {
		AFQs.insertMany(body, (err, afqs) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新解答题
 * @param body
 * @returns {Promise<unknown>}
 */
export const updateAFQ = function (body) {
	return new Promise((resolve) => {
		AFQs.updateOne(body.query, { $set: body.update }, (err, afqs) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			if (afqs.nModified === 1) {
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
 * 删除解答题
 * @param query
 * @returns {Promise<unknown>}
 */
export const deleteAFQ = function (query) {
	return new Promise((resolve) => {
		AFQs.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, afqs) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (afqs.nModified === 1) {
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
