<script lang="ts">
	export let version = ""
</script>

<span class="inline-flex items-center gap-1 font-cal tracking-wide">
	papi
	{#if version}
	<span
		class="rounded-full bg-teal-600 px-1 py-0.5 text-xs text-stone-50 shadow"
	>
		{version}
	</span>
	{/if}
</span>
