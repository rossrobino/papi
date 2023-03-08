<script lang="ts">
	import "../app.css";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="flex h-[100dvh] flex-col justify-between">
	<div>
		<header class="flex items-center justify-between gap-4 p-4 mb-12">
			<div class="text-4xl font-bold">
				<a href="/{data.session ? 'app' : ''}">papi</a>
			</div>
			{#if data.session}
				<form action="/?/signOut" method="POST" class="flex-row items-center">
					{#if data.session}
						<a href="/app/profile/{data.username}">@{data.username}</a>
					{/if}
					<button>Sign Out</button>
				</form>
			{:else}
				<a class="btn" href="/signin">Sign In</a>
			{/if}
		</header>
		<main class="p-4">
			<slot />
		</main>
	</div>
	<footer class="flex flex-col gap-4 p-4 mt-12">
		<div>
			<a href="/">Home</a>
		</div>
		<div>
			<a href="https://github.com/rossrobino/papi">GitHub</a>
		</div>
	</footer>
</div>
