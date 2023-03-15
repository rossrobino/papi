<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Head from "$lib/components/Head.svelte";
	import { loading } from "$lib/stores";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";

	export let form;

	let name: string;
	let source = "papi";
</script>

<Head
	title="Create Prompt"
	description="Create a new prompt."
	tagline="All prompts are shared publicly."
/>

<section class="flex flex-col gap-4">
	<form method="POST" use:enhance={loadingSubmitFunction}>
		<div>
			<label>
				Name
				<input
					type="text"
					name="name"
					placeholder="my-prompt"
					bind:value={name}
					required
					min="2"
					max="30"
				/>
			</label>
		</div>
		<div>
			<label>
				Description
				<input
					type="text"
					name="description"
					placeholder="description"
					required
				/>
			</label>
		</div>
		<div>
			<label>
				Source
				<select name="source" bind:value={source} required>
					<option value="papi" selected>papi</option>
					<option value="github">GitHub</option>
				</select>
			</label>
		</div>
		{#if source === "papi"}
			<div>
				<label>
					Prompt
					<textarea
						class="h-96"
						name="prompt"
						placeholder="Translate $$text$$ to Japanese"
						required
					/>
				</label>
			</div>
		{:else if source === "github"}
			<div>
				<label>
					GitHub Repository
					<input
						type="text"
						name="repository"
						placeholder="username/repository"
						required
					/>
				</label>
			</div>
			<div>
				<label>
					Path
					<input
						type="text"
						name="path"
						placeholder="prompts/{name ? name : 'name'}.md"
						required
					/>
				</label>
			</div>
		{/if}
		<button disabled={$loading}>Submit</button>
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
