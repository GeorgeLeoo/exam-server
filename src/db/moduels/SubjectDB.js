import Subjects from "../../model/subjects";
import ResponseCode from "../../utils/ResponseCode";

/**
 * 查询科目信息
 * @param query
 * @returns {Promise<unknown>}
 */
export const getSubjects = function (query) {
	return new Promise((resolve) => {
		Subjects.find(query.condition, (err, subjects) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, data: subjects });
		})
			.limit(parseInt(query.page.limit))
			.skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
			.sort({ _id: -1 });
	});
};

/**
 * 创建科目信息
 * @param body
 * @returns {Promise<unknown>}
 */
export const createSubject = function (body) {
	return new Promise((resolve) => {
		Subjects.insertMany(body, (err, subjects) => {
			if (err) {
				resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
			}
			resolve({ code: ResponseCode.SUCCESS, msg: "添加成功", data: [] });
		});
	});
};

/**
 * 更新科目信息
 * @param body
 * @returns {Promise<unknown>}
 */
export const updateSubject = function (body) {
	return new Promise((resolve) => {
		Subjects.updateOne(
			body.query,
			{ $set: body.update },
			(err, subjects) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (subjects.nModified === 1) {
					resolve({
						code: ResponseCode.SUCCESS,
						msg: "更新成功",
						data: [],
					});
				} else {
					resolve({
						code: ResponseCode.SERVICE_ERROR,
						msg: "更新失败",
						data: [],
					});
				}
			}
		);
	});
};

/**
 * 删除科目信息
 * @param query
 * @returns {Promise<unknown>}
 */
export const deleteSubject = function (query) {
	return new Promise((resolve) => {
		Subjects.updateOne(
			{ _id: query._id },
			{ $set: { isDelete: 1 } },
			(err, subjects) => {
				if (err) {
					resolve({ code: ResponseCode.SERVICE_ERROR, msg: err });
				}
				if (subjects.nModified === 1) {
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
