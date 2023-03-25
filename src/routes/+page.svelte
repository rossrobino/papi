<script lang="ts">
	import Head from "$lib/components/Head.svelte";
	import DataText from "$lib/components/DataText.svelte";
	import { info } from "$lib/info";
	import Papi from "$lib/components/Papi.svelte";
</script>

<Head
	title="A Prompt Library and API"
	description="Use papi to manage your prompts for ai models."
	class="text-teal-700"
/>

<div class="flex flex-col gap-8">
	<section class="flex flex-col gap-4">
		<h2>Library</h2>
		<p>
			Create prompts for AI models and share them with others with a unique
			link. Write prompts in <Papi /> or link a prompt from a GitHub repository to
			test and share with others.
		</p>
		<p>
			<a href="{info.baseUrl}/app/prompt/your-prompt-name">
				{info.baseUrl}/app/prompt/your-prompt-name
			</a>
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2>Functions</h2>
		<p>
			Run a prompt like a function--use the<DataText value="data" />syntax to
			insert variables into a prompt. <Papi />
			currently uses OpenAi's
			<a href="https://platform.openai.com/docs/models/gpt-3-5">
				gpt-3.5-turbo
			</a>
			model to run prompts.
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2>Run</h2>
		<p>Run a prompt in other applications with the API.</p>
		<p>
			<a href="/api/your-prompt-name">https://papi.run/api/your-prompt-name</a>
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2>Open Source</h2>
		<p>
			<Papi /> is open sourced under the MIT License. Check out the project on
			<a href="https://github.com/rossrobino/papi">GitHub</a>
			to contribute, share feedback, or create issues.
		</p>
		<p>
			<Papi /> is currently in
			<b>beta,</b>
			please be aware there could be bugs or downtime with the application.
		</p>
	</section>

	<div class="flex justify-center">
		<a class="btn btn-s px-8 py-4 text-xl" href="/signin">Get Started</a>
	</div>
</div>
