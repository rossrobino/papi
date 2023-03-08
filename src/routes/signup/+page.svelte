<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<h1 class="mb-6">Sign Up</h1>

<section>
	{#if form?.success}
		Check your email to complete verification. <a href="/signin">Sign In</a>
	{:else}
		<form method="POST" use:enhance class="flex flex-col gap-4">
			<div>
				<label>
					username
					<input type="text" name="username" />
				</label>
			</div>

			<div>
				<label>
					email
					<input type="email" name="email" />
				</label>
			</div>

			<div>
				<label>
					password
					<input type="password" name="password" />
				</label>
			</div>

			<button>Sign Up</button>
		</form>
	{/if}

	{#if form?.errorMessage}
		{#if form.errorMessage === 'duplicate key value violates unique constraint "profiles_username_key"'}
			Username already taken, please try again.
		{:else}
			{form.errorMessage}
		{/if}
	{/if}
</section>
