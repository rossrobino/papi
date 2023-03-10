<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Head from "$lib/components/Head.svelte";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<Head
	title="Reset Password"
	description="Reset the password for your account"
/>

<section class="flex flex-col gap-4">
	{#if !form?.success}
		<form method="POST" use:enhance>
			<label>
				Email
				<input type="email" name="email" required />
			</label>
			<button>Send Reset Link</button>
		</form>
	{:else}
		<p>{form.success}</p>
	{/if}
	{#if form?.error}
		<div class="flex"><ErrorMessage error={form.error} /></div>
	{/if}
</section>
