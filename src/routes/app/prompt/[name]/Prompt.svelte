<script lang="ts">
	import { enhance } from "$app/forms";
	import DataText from "$lib/components/DataText.svelte";
	import type { Database } from "$lib/db/types";
	import { loading } from "$lib/stores";
	import GitHub from "$lib/svg/GitHub.svelte";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";

	type PromptWithProfile = Database["public"]["Tables"]["prompts"]["Row"] & {
		profiles: Database["public"]["Tables"]["profiles"]["Row"];
	};

	export let prompt: PromptWithProfile;

	let splitPrompt = prompt.prompt?.split("$$");

	export let editing = false;
	let source = prompt.source;
</script>

<form method="POST" action="?/edit" use:enhance={loadingSubmitFunction}>
	<input type="hidden" name="id" value={prompt.id} />
	{#if editing}
		<section class="flex flex-col gap-4">
			<h2>Name</h2>
			<input type="text" name="name" bind:value={prompt.name} />
		</section>
	{/if}
	<div class="grid gap-8 md:grid-cols-3">
		<section class="flex flex-col gap-4">
			<h2>About</h2>
			<div>
				<a href="/app/profile/{prompt.profiles.username}" class="font-semibold">
					@{prompt.profiles.username}
				</a>
			</div>
			<div class="font-semibold">
				{new Date(String(prompt.created_at)).toLocaleDateString()}
			</div>
			{#if editing}
				<textarea
					name="description"
					class="h-full"
					value={prompt.description}
				/>
			{:else}
				<div class="whitespace-pre-wrap">{prompt.description}</div>
			{/if}
		</section>
		<section class="flex flex-col gap-4 md:col-span-2">
			<h2>Prompt</h2>
			{#if editing}
				<div>
					<label>
						Source
						<select name="source" bind:value={source} required>
							<option value="papi">papi</option>
							<option value="github">GitHub</option>
						</select>
					</label>
				</div>
			{/if}
			{#if editing && source === "papi"}
				<textarea class="h-96" name="prompt" value={prompt.prompt} />
			{:else if !editing}
				<div class="h-full">
					<p class="whitespace-pre-wrap">
						{#if splitPrompt}
							{#each splitPrompt as partial, i}
								{#if Math.abs(i % 2) == 1}
									<DataText value={partial} />
								{:else}
									<span>{partial.trim()}</span>
								{/if}
							{/each}
						{/if}
					</p>
				</div>
			{:else}
				<div>
					<label>
						Repository
						<input
							type="text"
							name="repository"
							placeholder="username/repository"
							bind:value={prompt.repository}
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
							placeholder="prompts/{prompt.name ? prompt.name : 'name'}.md"
							bind:value={prompt.path}
							required
						/>
					</label>
				</div>
			{/if}
			{#if source === "github" && prompt.repository && prompt.path}
				<div class="flex">
					<a
						class="flex items-center gap-2"
						href="https://github.com/{prompt.repository}/blob/main/{prompt.path}"
					>
						<GitHub />
						{prompt.repository}
					</a>
				</div>
			{/if}
		</section>
	</div>

	{#if editing}
		<button disabled={$loading}>Submit</button>
	{/if}
</form>
