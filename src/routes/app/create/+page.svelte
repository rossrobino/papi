<script>
	import { enhance } from "$app/forms";
</script>

<h1 class="mb-6">Create Prompt</h1>

<section>
	<form method="POST" use:enhance>
		<div>
			<label>
				Name
				<input type="text" name="name" />
			</label>
		</div>
		<div>
			<label>
				Description
				<input type="text" name="description" />
			</label>
		</div>
		<div>
			<label>
				Prompt
				<textarea class="h-96" name="prompt" />
			</label>
		</div>
		<button>Submit</button>
	</form>
</section>
