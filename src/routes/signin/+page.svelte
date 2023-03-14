<script lang="ts">
	import { enhance } from "$app/forms";
	import Head from "$lib/components/Head.svelte";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";
	import { loading } from "$lib/stores";

	export let form;
</script>

<Head title="Sign In" description="Sign into papi." />

<section class="flex flex-col gap-4">
	<form method="POST" use:enhance={loadingSubmitFunction}>
		<div>
			<label>
				Email
				<input type="email" name="email" required />
			</label>
		</div>

		<div>
			<label>
				Password
				<input type="password" name="password" required />
			</label>
		</div>
		<div class="flex justify-between">
			<a href="/signup">Create new account</a>
			<a href="/resetPassword">Forgot password</a>
		</div>

		<button disabled={$loading}>Sign In</button>
	</form>
	{#if form?.error}
		<div class="flex">
			<ErrorMessage error={form.error} />
		</div>
	{/if}
</section>
