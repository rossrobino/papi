<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Papi from "$lib/components/Papi.svelte";

	export let form;

	let confirm = "";
</script>

<section class="flex flex-col gap-4">
	<h2>Delete Account</h2>
	<p>
		Delete your <Papi /> account. This will delete all information including all
		prompts stored in <Papi />, this cannot be undone.
	</p>
	<form method="POST" use:enhance>
		<label>
			<div>
				Please type <b>delete-my-account</b>
				to confirm
			</div>
			<input
				type="text"
				name="confirm"
				bind:value={confirm}
				placeholder="delete-my-account"
			/>
		</label>
		<button class="btn-warning">Delete</button>
	</form>
	{#if form?.error}
		<ErrorMessage error={form.error} />
	{/if}
</section>
