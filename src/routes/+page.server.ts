import type { Actions } from "./$types";
import {
	Configuration,
	OpenAIApi,
} from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

export const actions = {
	chat: async ({ request }) => {
		try {
			const data = await request.formData();
			const prompt = data.get("prompt") as string;
			const configuration = new Configuration({
				apiKey: OPENAI_API_KEY,
			});
			const openai = new OpenAIApi(configuration);
			const response = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: prompt }],
				temperature: 0,
				max_tokens: 500,
			});
			const message = response.data.choices[0].message?.content;
			return { message };
		} catch (error) {
			console.error(error);
		}
	},
} satisfies Actions;
