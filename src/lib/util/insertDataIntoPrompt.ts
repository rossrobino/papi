export const insertDataIntoPrompt = (data: string, prompt: string) => {
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
};
