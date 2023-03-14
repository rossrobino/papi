<script lang="ts">
	import Head from "$lib/components/Head.svelte";
	import GitHubImage from "$lib/components/GitHubImage.svelte";

	export let data;
</script>

<div class="mb-6 flex items-center gap-6">
	{#if data.profile.github}
		<a href="https://github.com/{data.profile.github}">
			<GitHubImage github={data.profile.github} />
		</a>
	{/if}
	<Head
		title="@{data.profile.username}"
		description="View {data.profile.username}'s account."
		class="!mb-0"
	/>
</div>

<slot />
