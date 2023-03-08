<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData, PageData } from "./$types";
	import Prompt from "./Prompt.svelte";

	export let data: PageData;
	export let form: ActionData;

	const prompt = data.prompt.prompt;

	interface DataParam {
		key: string;
		value: string;
	}

	let dataParams: DataParam[] = [];

	const splitPrompt = prompt?.split("$$");

	splitPrompt?.forEach((s, i) => {
		// odd
		if (Math.abs(i % 2) == 1) {
			dataParams.push({ key: s, value: "value" });
		}
	});

	const stringifyDataParams = (dataParams: DataParam[]) => {
		if (dataParams.length < 1) return "";
		let result = "?data={";
		dataParams.forEach(({ key, value }) => {
			result += `"${key}":"${value}",`;
		});
		// remove last comma
		result = result.slice(0, -1);
		result += "}";
		return result;
	};

	$: dataString = stringifyDataParams(dataParams);
</script>

{#if data.prompt}
	<div class="flex flex-col gap-4">
		
		<Prompt editing={false} prompt={data.prompt} />

		<section class="flex flex-col gap-4">
			<h2>Run</h2>
			{#if dataParams.length}
				<table class="table-fixed">
					<thead>
						<tr>
							<th>key</th>
							<th>value</th>
						</tr>
					</thead>
					<tbody>
						{#each dataParams as { key, value }}
							<tr>
								<td>{key}</td>
								<td><textarea class="w-full" bind:value /></td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
			<form method="POST" action="?/run" use:enhance>
				<input type="hidden" value={dataString} name="dataString" />
				<button>Test Prompt</button>
			</form>
			{#if form?.answer}
				<blockquote>{form.answer}</blockquote>
			{/if}
		</section>
		<section>
			<h2 class="mb-4">API Endpoint</h2>
			<a href="/api/{data.prompt.name}{dataString}">
				https://papi.robino.dev/api/{data.prompt.name}{dataString}
			</a>
		</section>
		{#if data.user?.id === data.prompt.profiles.id}
			<div class="flex justify-start">
				<a class="btn" href="/app/prompt/{data.prompt.name}/edit">
					Edit prompt
				</a>
			</div>
		{/if}
	</div>
{/if}
