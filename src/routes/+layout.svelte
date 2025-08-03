<script lang="ts">
	// import Footer from '$lib/components/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

	import '../app.css';

	let { children } = $props();

	if (browser) {
		const trackPageView = (path) => {
			if (typeof gtag === 'function') {
				gtag('event', 'page_view', {
					page_path: path
				});
			}
		};

		trackPageView(window.location.pathname);

		afterNavigate(({ to }) => {
			if (to) {
				trackPageView(to.url.pathname);
			}
		});
	}
</script>

<svelte:head>
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA_MEASUREMENT_ID}"
	></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', '{PUBLIC_GA_MEASUREMENT_ID}');
	</script>
</svelte:head>

<div class="flex min-h-screen flex-col bg-white text-gray-900">
	<main class="flex-1">
		{@render children()}
	</main>
	<!-- <Footer /> -->
</div>
