export const insertDataIntoPrompt = (data: string, prompt: string) => {
	try {
		const dataObj = JSON.parse(data);
		const splitPrompt = prompt.split("$$");
		splitPrompt.forEach((s) => {
			if (s in dataObj) {
				const index = splitPrompt.indexOf(s);
				splitPrompt[index] = dataObj[s];
			}
		});
		const result = splitPrompt.join("");
		return result;
	} catch (error) {
		return prompt;
	}
};
