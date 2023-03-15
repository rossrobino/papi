// https://platform.openai.com/docs/api-reference/moderations/create

import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

export const moderate = async (text: string | string[]) => {
	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const response = await openai.createModeration({
		input: text,
	});
	let flagged = false;
	response.data.results.forEach((result) => {
		if (result.flagged) flagged = true;
	});
	return flagged;
};
