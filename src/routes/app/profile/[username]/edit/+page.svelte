<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import { loading } from "$lib/stores";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";

	export let data;
	export let form;
</script>

{#if data.profile}
	<h2 class="mb-4 mt-12 text-lg">All information is shared publicly.</h2>
	<section class="flex flex-col gap-4">
		<form method="POST" use:enhance={loadingSubmitFunction}>
			<label>
				Username
				<input
					type="text"
					name="username"
					value={data.profile.username}
					required
					min="2"
					max="30"
				/>
			</label>
			<label>
				GitHub
				<input
					type="text"
					class="basis-full"
					name="github"
					value={data.profile.github}
					required
				/>
				<span class="text-xs">
					Link a GitHub account to display your profile picture on your page.
				</span>
			</label>
			<button disabled={$loading}>Submit</button>
			<div class="flex justify-between gap-4">
				<a href="/resetPassword/reset">Reset password</a>
				<a href="/app/profile/{data.profile.username}/delete">Delete Account</a>
			</div>
		</form>
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
{/if}
