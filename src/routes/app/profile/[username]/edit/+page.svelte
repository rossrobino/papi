<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import type { ActionData, PageData } from "./$types";

	export let data: PageData;
	export let form: ActionData;
</script>

{#if data.profile}
	<section class="flex flex-col gap-4">
		<form method="POST" use:enhance>
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
				<div class="flex items-center gap-2">
					<span>@</span>
					<input
						type="text"
						class="basis-full"
						name="github"
						value={data.profile.github}
						required
					/>
				</div>
			</label>
			<button>Submit</button>
			<a href="/resetPassword/reset">Reset password</a>
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
