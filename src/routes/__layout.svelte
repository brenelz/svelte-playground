<script>
	import '../app.css';
</script>

<div class="container p-10 max-w-xl m-auto">
	<h1 class="text-3xl pb-4">My App</h1>
	<ul class="pb-8">
		<li><a href="/">Home</a></li>
		<li><a href="/another-page">Another</a></li>
	</ul>
	<slot />
</div>
