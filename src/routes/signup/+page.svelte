<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Head from "$lib/components/Head.svelte";
	import { loading } from "$lib/stores";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";

	export let form;
</script>

<Head title="Sign Up" description="Create a papi account." />

<section class="flex flex-col gap-4">
	{#if form?.success}
		Check your email to complete verification. <a href="/signin">Sign In</a>
	{:else}
		<form
			method="POST"
			use:enhance={loadingSubmitFunction}
			class="flex flex-col gap-4"
		>
			<div>
				<label>
					Username
					<input type="text" min="2" max="30" name="username" required />
				</label>
			</div>

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

			<button disabled={$loading}>Sign Up</button>
		</form>
	{/if}

	{#if form?.error}
		<div class="flex">
			{#if form.error === 'duplicate key value violates unique constraint "profiles_username_key"'}
				<ErrorMessage error="Username already taken, please try again." />
			{:else}
				<ErrorMessage error={form.error} />
			{/if}
		</div>
	{/if}
</section>
