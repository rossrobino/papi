<script lang="ts">
	import Prompt from "../Prompt.svelte";
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import { loading } from "$lib/stores";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";

	export let data;
	export let form;
</script>

{#if data.prompt}
	<div class="flex flex-col gap-4">
		<Prompt editing={true} prompt={data.prompt} />
		<form method="POST" action="?/delete" use:enhance={loadingSubmitFunction}>
			<button disabled={$loading} class="btn-warning">Delete</button>
		</form>
	</div>
	{#if form?.error}
		<div class="flex mt-4">
			{#if form.error === 'duplicate key value violates unique constraint "prompts_name_key"'}
				<ErrorMessage error="Name is already taken, please enter a new name" />
			{:else}
				<ErrorMessage error={form.error} />
			{/if}
		</div>
	{/if}
{/if}
