<script lang="ts">
	import Head from "$lib/components/Head.svelte";
	import DataText from "$lib/components/DataText.svelte";
	import { info } from "$lib/info";
	import Papi from "$lib/components/Papi.svelte";
</script>

<Head
	title="A Prompt Manager and API"
	description="Use papi to manage your prompts for ai models."
/>

<div class="flex flex-col gap-8">
	<section class="flex flex-col gap-4">
		<h2>Library</h2>
		<p>
			Create prompts for AI models and share them with others. <Papi />
			currently uses the
			<a href="/">gpt-3.5-turbo</a>
			model.
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2>Functions</h2>
		<p>
			Run a prompt like a function. Use the <DataText value="data" />
			syntax to insert data as variables directly into a prompt.
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2>API</h2>
		<p>
			Use the API to access prompts in any application with no additional setup
			required.
		</p>
		<p>
			<code>{info.baseUrl}/api/your-prompt-name</code>
		</p>
	</section>
	<div class="flex justify-center">
		<a class="btn btn-s px-8 py-4 text-xl" href="/app">Get Started</a>
	</div>
</div>
