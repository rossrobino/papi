<script lang="ts">
	import NavLinks from "$lib/components/NavLinks.svelte";
	import "../app.css";
	import "cal-sans";
	import Papi from "$lib/components/Papi.svelte";
	import { enhance } from "$app/forms";
	import { loadingSubmitFunction } from "$lib/util/loadingSubmitFunction";
	import { loading } from "$lib/stores";

	export let data;
</script>

<div class="flex h-[100dvh] flex-col justify-between">
	<div>
		<header class="mb-12 p-4">
			<div class="mb-6 flex items-center justify-between gap-4 md:mb-0">
				<div class="text-4xl font-bold">
					<a href="/" class="no-underline"><Papi /></a>
				</div>
				<NavLinks
					class="hidden md:flex"
					session={data.session}
					username={data.username}
				/>
				{#if data.session}
					<form
						action="/?/signOut"
						method="POST"
						use:enhance={loadingSubmitFunction}
					>
						<button disabled={$loading}>Sign Out</button>
					</form>
				{:else}
					<a class="btn" href="/signin">Sign In</a>
				{/if}
			</div>
			<NavLinks
				class="flex md:hidden"
				session={data.session}
				username={data.username}
			/>
		</header>
		<main class="p-4">
			<slot />
		</main>
	</div>

	<footer class="mt-12 flex flex-col gap-4 bg-stone-900 p-4 text-stone-50">
		<div>
			<a href="/">Home</a>
		</div>
		<div>
			<a href="/app">Dashboard</a>
		</div>
		<div>
			<a href="/app/create">Create</a>
		</div>
		{#if data.session}
			<div>
				<a href="/app/profile/{data.username}">@{data.username}</a>
			</div>
		{/if}
		<div>
			<a href="https://github.com/rossrobino/papi">GitHub</a>
		</div>
	</footer>
</div>
