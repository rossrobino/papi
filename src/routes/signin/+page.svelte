<script>
	import { enhance } from "$app/forms";
</script>

<h1 class="mb-6">Sign In</h1>

<section class="mb-4">
	<form method="POST" use:enhance>
		<div>
			<label>
				email
				<input type="email" name="email" />
			</label>
		</div>

		<div>
			<label>
				password
				<input type="password" name="password" />
			</label>
		</div>
		<a href="/signup">Create new account</a>
		<button>Sign In</button>
	</form>
</section>
