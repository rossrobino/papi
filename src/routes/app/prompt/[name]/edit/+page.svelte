<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import Prompt from "../Prompt.svelte";
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";

	export let data: PageData;
	export let form: ActionData;
</script>

{#if data.prompt}
	<div class="flex flex-col gap-4">
		<Prompt editing={true} prompt={data.prompt} />
		<form method="POST" action="?/delete" use:enhance>
			<button class="btn-warning">Delete</button>
		</form>
	</div>
	{#if form?.error}
		<div class="flex">
			{#if form.error === 'duplicate key value violates unique constraint "prompts_name_key"'}
				<ErrorMessage error="Name is already taken, please enter a new name" />
			{:else}
				<ErrorMessage error={form.error} />
			{/if}
		</div>
	{/if}
{/if}
