import Response from "../utils/Response";
import ResponseCode from "../utils/ResponseCode";
import {
	getMultiples,
	createMultiple,
	updateMultiple,
	deleteMultiple,
} from "../db/moduels/MultipleDB";

class MultipleController {
	/**
	 * 获取多选信息
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getMultiple(ctx) {
		const response = new Response(ctx);
		const { content, author, limit, page } = ctx.request.query;
		if (!limit && limit > 0) {
			response.send(ResponseCode.CLIENT_ERROR, "页面大小必须大于0");
			return;
		}
		if (!page) {
			response.send(ResponseCode.CLIENT_ERROR, "当前页面必须大于0");
			return;
		}
		const condition = { isDelete: 0 };
		content && (condition.content = name);
		author && (condition.author = author);
		let { code, msg, data } = await getMultiples({
			condition,
			page: { limit, page },
		});
		response.send(code, msg, data);
	}

	/**
	 * 创建多选
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async createMultiple(ctx) {
		const response = new Response(ctx);
		let {
			question,
			subjectId,
			knowledgePoint,
			picture,
			a,
			b,
			c,
			d,
			correctAnswer,
			explanation,
			difficulty,
			teacherId,
		} = ctx.request.body;
		if (!teacherId) {
			response.send(ResponseCode.CLIENT_ERROR, "您还没有登录");
			return;
		}
		if (!question) {
			response.send(ResponseCode.CLIENT_ERROR, "题目不能为空");
			return;
		}
		if (!subjectId) {
			response.send(ResponseCode.CLIENT_ERROR, "请选择科目");
			return;
		}
		if (!knowledgePoint) {
			response.send(ResponseCode.CLIENT_ERROR, "知识点不能为空");
			return;
		}
		if (!a) {
			response.send(ResponseCode.CLIENT_ERROR, "选项A不能为空");
			return;
		}
		if (!b) {
			response.send(ResponseCode.CLIENT_ERROR, "选项B不能为空");
			return;
		}
		if (!c) {
			response.send(ResponseCode.CLIENT_ERROR, "选项C不能为空");
			return;
		}
		if (!d) {
			response.send(ResponseCode.CLIENT_ERROR, "选项D不能为空");
			return;
		}
		if (!correctAnswer) {
			response.send(ResponseCode.CLIENT_ERROR, "正确答案不能为空");
			return;
		}
		if (!difficulty) {
			response.send(ResponseCode.CLIENT_ERROR, "请选择难度系数");
			return;
		}
		if (!explanation) {
			explanation = "略";
		}
		const insert = {
			question,
			subjectId,
			knowledgePoint,
			picture,
			a,
			b,
			c,
			d,
			correctAnswer,
			explanation,
			difficulty,
			teacherId,
		};
		if (picture) {
			insert.picture = picture;
		}
		let { code, msg, data } = await createMultiple(insert);
		response.send(code, msg, data);
	}

	/**
	 * 更新多选
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async updateMultiple(ctx) {
		const response = new Response(ctx);
		let {
			_id,
			question,
			subjectId,
			knowledgePoint,
			picture,
			a,
			b,
			c,
			d,
			correctAnswer,
			explanation,
			difficulty,
			teacherId,
		} = ctx.request.body;
		if (!teacherId) {
			response.send(ResponseCode.CLIENT_ERROR, "您还没有登录");
			return;
		}
		if (!question) {
			response.send(ResponseCode.CLIENT_ERROR, "题目不能为空");
			return;
		}
		if (!subjectId) {
			response.send(ResponseCode.CLIENT_ERROR, "请选择科目");
			return;
		}
		if (!knowledgePoint) {
			response.send(ResponseCode.CLIENT_ERROR, "知识点不能为空");
			return;
		}
		if (!a) {
			response.send(ResponseCode.CLIENT_ERROR, "选项A不能为空");
			return;
		}
		if (!b) {
			response.send(ResponseCode.CLIENT_ERROR, "选项B不能为空");
			return;
		}
		if (!c) {
			response.send(ResponseCode.CLIENT_ERROR, "选项C不能为空");
			return;
		}
		if (!d) {
			response.send(ResponseCode.CLIENT_ERROR, "选项D不能为空");
			return;
		}
		if (!correctAnswer) {
			response.send(ResponseCode.CLIENT_ERROR, "正确答案不能为空");
			return;
		}
		if (!difficulty) {
			response.send(ResponseCode.CLIENT_ERROR, "请选择难度系数");
			return;
		}
		if (!explanation) {
			explanation = "略";
		}
		const body = {
			query: { _id },
			update: {
				question,
				subjectId,
				knowledgePoint,
				a,
				b,
				c,
				d,
				correctAnswer,
				explanation,
				difficulty,
				teacherId,
			},
		};
		if (picture) {
			body.update.picture = picture;
		}
		let { code, msg, data } = await updateMultiple(body);
		response.send(code, msg, data);
	}

	/**
	 * 删除多选
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async deleteMultiple(ctx) {
		const { _id } = ctx.request.query;
		const response = new Response(ctx);
		let { code, msg, data } = await deleteMultiple({ _id });
		response.send(code, msg, data);
	}
}

const multipleController = new MultipleController();

export default multipleController;
