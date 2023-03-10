<script lang="ts">
	import type { ZodIssue } from "zod";
	export let error = "";

	let issues: ZodIssue[] = [];
	let zod = true;

	try {
		issues = JSON.parse(error);
	} catch (e) {
		zod = false;
	}
</script>

<div
	class="flex gap-2 rounded-3xl bg-rose-700 px-4 py-2 font-semibold text-stone-100 shadow"
>
	{#if zod}
		<ul>
			{#each issues as { message, path }}
				<li>
					{String(path[0]).charAt(0).toUpperCase() + String(path[0]).slice(1)} -
					{message}
				</li>
			{/each}
		</ul>
	{:else}
		{error}
	{/if}
</div>
