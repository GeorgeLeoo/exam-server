import Response from "../utils/Response";
import ResponseCode from "../utils/ResponseCode";
import {
	getAnswers,
	createAnswer,
	updateAnswer,
	deleteAnswer,
} from "../db/moduels/AnswerDB";

class AnswerController {
	/**
	 * 获取考生答案信息
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getAnswer(ctx) {
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
		let { code, msg, data } = await getAnswers({
			condition,
			page: { limit, page },
		});
		response.send(code, msg, data);
	}

	/**
	 * 创建考生答案
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async createAnswer(ctx) {
		const response = new Response(ctx);
		const {
			single,
			multiple,
			judge,
			completion,
			afq,
			studentId,
			paperId,
		} = ctx.request.body;
		if (!studentId) {
			response.send(ResponseCode.CLIENT_ERROR, "你还未登录");
			return;
		}
		if (!paperId) {
			response.send(ResponseCode.CLIENT_ERROR, "你还未参加考试");
			return;
		}
		let { code, msg, data } = await createAnswer({
			single,
			multiple,
			judge,
			completion,
			afq,
			studentId,
			paperId,
		});
		response.send(code, msg, data);
	}

	/**
	 * 更新考生答案
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async updateAnswer(ctx) {
		const response = new Response(ctx);
		const {
			_id,
			single,
			multiple,
			judge,
			completion,
			afq,
			studentId,
			paperId,
		} = ctx.request.body;
		if (!studentId) {
			response.send(ResponseCode.CLIENT_ERROR, "你还未登录");
			return;
		}
		if (!paperId) {
			response.send(ResponseCode.CLIENT_ERROR, "你还未参加考试");
			return;
		}
		const body = {
			query: { _id },
			update: {
				single,
				multiple,
				judge,
				completion,
				afq,
				studentId,
				paperId,
			},
		};
		let { code, msg, data } = await updateAnswer(body);
		response.send(code, msg, data);
	}

	/**
	 * 删除考生答案
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async deleteAnswer(ctx) {
		const { _id } = ctx.request.query;
		const response = new Response(ctx);
		let { code, msg, data } = await deleteAnswer({ _id });
		response.send(code, msg, data);
	}
}

const answerController = new AnswerController();

export default answerController;
