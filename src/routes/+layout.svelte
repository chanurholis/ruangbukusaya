<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-white text-gray-900">
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
