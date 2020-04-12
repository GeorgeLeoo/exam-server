import Response from "../utils/Response";
import ResponseCode from "../utils/ResponseCode";
import {
	getPapers,
	createPaper,
	updatePaper,
	deletePaper,
} from "../db/moduels/PaperDB";

class PaperController {
	/**
	 * 获取试卷信息
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getPaper(ctx) {
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
		let { code, msg, data } = await getPapers({
			condition,
			page: { limit, page },
		});
		response.send(code, msg, data);
	}

	/**
	 * 创建试卷
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async createPaper(ctx) {
		const response = new Response(ctx);
		const {
			adminId,
			testType,
			name,
			subjectId,
			startTime,
			endTime,
			durationTime,
			difficulty,
			attention,
			paperType,
			count,
			total,
			singleNumber,
			singleScore,
			multipleNumber,
			multipleScore,
			judgeNumber,
			judgeScore,
			completionNumber,
			completionScore,
			afqNumber,
			afqScore,
		} = ctx.request.body;
		if (!content) {
			response.send(ResponseCode.CLIENT_ERROR, "试卷内容不能为空");
			return;
		}
		let { code, msg, data } = await createPaper({
			adminId,
			testType,
			name,
			subjectId,
			startTime,
			endTime,
			durationTime,
			difficulty,
			attention,
			paperType,
			count,
			total,
			singleNumber,
			singleScore,
			multipleNumber,
			multipleScore,
			judgeNumber,
			judgeScore,
			completionNumber,
			completionScore,
			afqNumber,
			afqScore,
		});
		response.send(code, msg, data);
	}

	/**
	 * 更新试卷
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async updatePaper(ctx) {
		const response = new Response(ctx);
		const {
			_id,
			adminId,
			testType,
			name,
			subjectId,
			startTime,
			endTime,
			durationTime,
			difficulty,
			attention,
			paperType,
			count,
			total,
			singleNumber,
			singleScore,
			multipleNumber,
			multipleScore,
			judgeNumber,
			judgeScore,
			completionNumber,
			completionScore,
			afqNumber,
			afqScore,
		} = ctx.request.body;
		const body = {
			query: { _id },
			update: {
				adminId,
				testType,
				name,
				subjectId,
				startTime,
				endTime,
				durationTime,
				difficulty,
				attention,
				paperType,
				count,
				total,
				singleNumber,
				singleScore,
				multipleNumber,
				multipleScore,
				judgeNumber,
				judgeScore,
				completionNumber,
				completionScore,
				afqNumber,
				afqScore,
			},
		};
		let { code, msg, data } = await updatePaper(body);
		response.send(code, msg, data);
	}

	/**
	 * 删除试卷
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async deletePaper(ctx) {
		const { _id } = ctx.request.query;
		const response = new Response(ctx);
		let { code, msg, data } = await deletePaper({ _id });
		response.send(code, msg, data);
	}
}

const paperController = new PaperController();

export default paperController;
