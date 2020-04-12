import Multiples from "../../model/multiples";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询多选题
 * @param query
 * @returns {Promise<unknown>}
 */
export const getMultiples = function (query) {
	return new Promise((resolve) => {
		Multiples.find(query.condition, (err, multiples) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: multiples });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建多选题
 * @param body
 * @returns {Promise<unknown>}
 */
export const createMultiple = function (body) {
	return new Promise((resolve) => {
		Multiples.insertMany(body, (err, multiples) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新多选题
 * @param body
 * @returns {Promise<unknown>}
 */
export const updateMultiple = function (body) {
	return new Promise((resolve) => {
		Multiples.updateOne(
			body.query,
			{ $set: body.update },
			(err, multiples) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (multiples.nModified === 1) {
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
 * 删除多选题
 * @param query
 * @returns {Promise<unknown>}
 */
export const deleteMultiple = function (query) {
	return new Promise((resolve) => {
		Multiples.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, multiples) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (multiples.nModified === 1) {
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
