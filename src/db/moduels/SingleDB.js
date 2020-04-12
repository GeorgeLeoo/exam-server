import Singles from "../../model/singles";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询单选题
 * @param query
 * @returns {Promise<unknown>}
 */
export const getSingles = function (query) {
	return new Promise((resolve) => {
		Singles.find(query.condition, (err, singles) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: singles });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建单选题
 * @param insert
 * @returns {Promise<unknown>}
 */
export const createSingle = function (insert) {
	return new Promise((resolve) => {
		Singles.insertMany(insert, (err, singles) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新单选题
 * @param body
 * @returns {Promise<unknown>}
 */
export const updateSingle = function (body) {
	return new Promise((resolve) => {
		Singles.updateOne(body.query, { $set: body.update }, (err, singles) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			if (singles.nModified === 1) {
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
 * 删除单选题
 * @param query
 * @returns {Promise<unknown>}
 */
export const deleteSingle = function (query) {
	return new Promise((resolve) => {
		Singles.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, singles) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (singles.nModified === 1) {
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
