<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

	import '../app.css';

	let { children } = $props();

	// Fungsi ini hanya akan berjalan sekali setelah komponen dimuat di browser
	afterNavigate(
		() => {
			// Pastikan kita hanya menjalankan ini sekali untuk inisialisasi
			if (browser && !window.dataLayer) {
				// 1. Buat dan suntikkan skrip Google Analytics secara dinamis
				const script = document.createElement('script');
				script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_MEASUREMENT_ID}`;
				script.async = true;
				document.head.appendChild(script);

				// 2. Inisialisasi dataLayer dan fungsi gtag
				window.dataLayer = window.dataLayer || [];
				window.gtag = function () {
					window.dataLayer.push(arguments);
				};

				// 3. Kirim konfigurasi awal (ini sudah otomatis melacak page view pertama)
				window.gtag('js', new Date());
				window.gtag('config', PUBLIC_GA_MEASUREMENT_ID);
			}
		},
		{ once: true }
	); // Opsi { once: true } memastikan ini hanya berjalan sekali

	// Lacak setiap navigasi SETELAH kunjungan pertama
	afterNavigate(({ from, to }) => {
		// Pastikan ini bukan navigasi pertama kali dan URL berubah
		if (browser && from && to && from.url.pathname !== to.url.pathname) {
			if (typeof window.gtag === 'function') {
				// Cara yang benar untuk melacak page view di SPA
				window.gtag('config', PUBLIC_GA_MEASUREMENT_ID, {
					page_path: to.url.pathname
				});
			}
		}
	});
</script>

<svelte:head />

<div class="flex min-h-screen flex-col bg-white text-gray-900">
	<main class="flex-1">
		{@render children()}
	</main>
</div>
