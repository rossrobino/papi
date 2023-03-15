<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { insertDataIntoPrompt } from "$lib/util/insertDataIntoPrompt";
	import { loading } from "$lib/stores";
	import Prompt from "./Prompt.svelte";
	import { info } from "$lib/info";
	import StarOutline from "$lib/svg/StarOutline.svelte";
	import StarSolid from "$lib/svg/StarSolid.svelte";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";

	export let data;
	export let form;

	const prompt = data.prompt.prompt;

	interface DataParam {
		key: string;
		value: string;
	}

	let dataParams: DataParam[] = [];

	const splitPrompt = prompt?.split("$$");

	splitPrompt?.forEach((s, i) => {
		// if odd
		if (Math.abs(i % 2) == 1) {
			if (dataParams.length) {
				// remove duplicate keys
				dataParams.forEach((obj) => {
					if (obj.key !== s) {
						dataParams.push({ key: s, value: "value" });
					}
				});
			} else {
				dataParams.push({ key: s, value: "value" });
			}
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

<div class="mb-8 flex justify-end gap-4 md:-mt-[4.5rem]">
	<form
		action={data.isStarred ? "?/removeStar" : "?/star"}
		method="POST"
		use:enhance={loadingSubmitFunction}
	>
		<input type="hidden" name="id" value={data.prompt.id} />
		<button class="flex items-center gap-1" disabled={$loading}>
			{#if data.isStarred}
				<StarSolid />
			{:else}
				<StarOutline />
			{/if}
			<span>Star ({data.prompt.stars.length})</span>
		</button>
	</form>

	<!-- only show edit button if user id matches the prompt's user -->
	{#if data.user?.id === data.prompt.profiles.id}
		<a class="btn" href="/app/prompt/{data.prompt.name}/edit">Edit prompt</a>
	{/if}
</div>

{#if data.prompt}
	<div class="flex flex-col gap-8">
		<Prompt editing={false} prompt={data.prompt} />
		<div class="grid gap-8" class:md:grid-cols-2={dataParams.length}>
			{#if dataParams.length}
				<section class="flex flex-col gap-4">
					<h2>Data</h2>
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
									<th>{key}</th>
									<td><input class="w-full" bind:value /></td>
								</tr>
							{/each}
						</tbody>
					</table>
				</section>
			{/if}
			<section class="flex flex-col justify-end gap-4">
				<div class="min-h-[40px]">
					{#if form?.answer && !$loading}
						<blockquote>
							{form.answer}
						</blockquote>
					{/if}
					{#if $loading}
						<div class="flex">
							<blockquote class="animate-pulse">. . .</blockquote>
						</div>
					{/if}
				</div>

				<form method="POST" action="?/run" use:enhance={loadingSubmitFunction}>
					<input type="hidden" value={dataString} name="dataString" />
					<div class="flex items-end gap-2">
						<p class="message">
							{insertDataIntoPrompt(
								dataString.slice(6),
								String(data.prompt.prompt),
							)}
						</p>
						<button class="p-2" disabled={$loading}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-8 w-8"
							>
								<title>Submit</title>
								<path
									fill-rule="evenodd"
									d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</form>
			</section>
		</div>
	</div>
{/if}
