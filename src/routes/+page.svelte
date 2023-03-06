<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;

	let loading = false;

	const submit: SubmitFunction = () => {
		// before response
		loading = true;
		// after response
		return async ({ update }) => {
			loading = false;
			// run default update
			update();
		};
	};
</script>

<form action="?/chat" method="POST" use:enhance={submit}>
	<label>
		prompt:
		<input type="text" name="prompt" class="bg-blue-50" />
	</label>
</form>

{#if form?.message}
	{JSON.stringify(form.message)}
{/if}
