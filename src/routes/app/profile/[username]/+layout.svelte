<script lang="ts">
	import Head from "$lib/components/Head.svelte";
	import GitHubImage from "$lib/components/GitHubImage.svelte";
	import GitHub from "$lib/svg/GitHub.svelte";

	export let data;

	let editing: boolean;
	$: editing = data.route.id === "/app/profile/[username]/edit" ? true : false;

	let stars: boolean;
	$: stars = data.route.id === "/app/profile/[username]/stars" ? true : false;
</script>

<div class="mb-6 flex items-center gap-6">
	{#if data.profile.github}
		<GitHubImage github={data.profile.github} />
	{/if}
	<div class="flex flex-col gap-2">
		<Head
			title="@{data.profile.username}"
			description="View {data.profile.username}'s account."
			class="!mb-0"
		/>
		{#if data.profile.github}
			<a
				class="flex items-center gap-0.5"
				href="https://github.com/{data.profile.github}"
			>
				<GitHub />{data.profile.github}
			</a>
		{/if}
	</div>
</div>

{#if data.profile.id === data.session?.user.id && !editing}
	<div class="mb-8 flex justify-end md:-mt-[5.5rem] md:mb-14">
		<a class="btn" href="/app/profile/{data.profile.username}/edit">
			Edit profile
		</a>
	</div>
{/if}

{#if !editing}
	<!-- TABS -->
	<div class="mb-4 flex gap-2">
		<a
			class="tab"
			class:tab-selected={!stars}
			href="/app/profile/{data.profile.username}"
		>
			Prompts
		</a>
		<a
			class="tab"
			class:tab-selected={stars}
			href="/app/profile/{data.profile.username}/stars"
		>
			Stars
		</a>
	</div>
{/if}

<slot />
