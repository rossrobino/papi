// https://platform.openai.com/docs/api-reference/moderations/create

import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

export const moderate = async (text: string | string[]) => {
	console.log("moderating...");
	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const response = await openai.createModeration({
		input: text,
	});
	console.log(response.data.results);
	let flagged = false;
	response.data.results.forEach(result => {
		if (result.flagged) flagged = true;
	});
	return flagged;
};

const exampleReponse = [
	{
		flagged: false,
		categories: {
			sexual: false,
			hate: false,
			violence: false,
			"self-harm": false,
			"sexual/minors": false,
			"hate/threatening": false,
			"violence/graphic": false,
		},
		category_scores: {
			sexual: 0.11911293864250183,
			hate: 0.00034095876617357135,
			violence: 0.0000020004733869427582,
			"self-harm": 2.0692729307825175e-8,
			"sexual/minors": 0.000016815050912555307,
			"hate/threatening": 2.1237431258036565e-10,
			"violence/graphic": 7.807685875604875e-8,
		},
	},
];
