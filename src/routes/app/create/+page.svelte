<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Head from "$lib/components/Head.svelte";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<Head title="Create Prompt" description="Create a new prompt." />

<section class="flex flex-col gap-4">
	<form method="POST" use:enhance>
		<div>
			<label>
				Name
				<input type="text" name="name" required min="2" max="30" />
			</label>
		</div>
		<div>
			<label>
				Description
				<input type="text" name="description" required />
			</label>
		</div>
		<div>
			<label>
				Prompt
				<textarea class="h-96" name="prompt" required />
			</label>
		</div>
		<button>Submit</button>
	</form>
	{#if form?.error}
		<div class="flex">
			{#if form.error === 'duplicate key value violates unique constraint "prompts_name_key"'}
				<ErrorMessage error="Name is already taken, please enter a new name" />
			{:else}
				<ErrorMessage error={form.error} />
			{/if}
		</div>
	{/if}
</section>
