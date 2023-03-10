<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Head from "$lib/components/Head.svelte";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<Head
	title="New Password"
	description="Create a new password for your account"
/>

<section class="flex flex-col gap-4">
	{#if !form?.success}
		<form method="POST" use:enhance>
			<label>
				Password
				<input type="password" name="password" required />
			</label>
			<button>Reset Password</button>
		</form>
	{:else}
		<p>{form.success}</p>
	{/if}
	{#if form?.error}
		<div class="flex">
			<ErrorMessage error={form.error} />
		</div>
	{/if}
</section>
