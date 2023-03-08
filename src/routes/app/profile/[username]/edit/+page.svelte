<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.profile}
	<section>
		<form method="POST" use:enhance>
			<label>
				Username
				<input type="text" name="username" />
			</label>
			<label>
				GitHub
				<div class="flex items-center gap-2">
					<span>@</span>
					<input type="text" class="basis-full" name="github" />
				</div>
			</label>
			<button>Submit</button>
		</form>
	</section>
{/if}

