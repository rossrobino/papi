export const githubContents = async (
	repository: string,
	path: string,
	fetch: (
		input: URL | RequestInfo,
		init?: RequestInit | undefined,
	) => Promise<Response>,
) => {
	try {
		const res = await fetch(
			`https://raw.githubusercontent.com/${repository}/main/${path}`,
		);
		const text = await res.text();
		return text;
	} catch (error) {
		return "GitHub contents not found.";
	}
};
