<script lang="ts">
	export let github = "";
	export let size = 6;
</script>

<img
	src="https://github.com/{github}.png"
	style="height: {size}rem;"
	class="rounded-full"
	alt={github}
/>
