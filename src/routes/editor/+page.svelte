<script lang="ts">
	import RichText from '$lib/components/RichText.svelte';
	import type { Review } from '$lib/data/reviews';

	// State untuk form fields
	let title = '';
	let excerpt = '';
	let content = '';

	// State untuk UI
	let errorMessage = '';
	let successMessage = '';
	let isLoading = false;

	/**
	 * Fungsi untuk membersihkan HTML dari tag kosong yang sering dihasilkan Quill
	 * dan memeriksa apakah kontennya benar-benar kosong.
	 */
	function isContentEmpty(html: string): boolean {
		if (!html) return true;
		const strippedHtml = html.replace(/<(.|\n)*?>/g, '').trim();
		return strippedHtml.length === 0;
	}

	async function handleSubmit() {
		isLoading = true;
		errorMessage = '';
		successMessage = '';

		// --- Validasi Sederhana ---
		if (!title || !excerpt || isContentEmpty(content)) {
			errorMessage = 'Semua field (Title, Excerpt, dan Content) harus diisi.';
			isLoading = false;
			return;
		}

		// Membuat slug dari judul (contoh sederhana)
		const slug = title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '');

		// Membuat objek data review baru
		const newReview: Omit<Review, 'date'> & { date?: string } = {
			slug,
			title,
			excerpt,
			content
		};

		// Menambahkan tanggal hari ini dengan format YYYY-MM-DD
		newReview.date = new Date().toISOString().split('T')[0];

		// Mengirim data ke endpoint API
		const response = await fetch('/api/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newReview)
		});

		const result = await response.json();
		isLoading = false;

		if (response.ok) {
			successMessage = result?.message;
			// Reset form setelah berhasil
			title = '';
			excerpt = '';
			content = '';
		} else {
			errorMessage = result?.message || 'Terjadi kesalahan saat menyimpan data.';
		}
	}
</script>

<div class="container mx-auto max-w-4xl p-6">
	<h1 class="mb-6 text-center text-3xl font-bold">Add New Review</h1>

	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		<div>
			<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
			<input
				type="text"
				id="title"
				bind:value={title}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="Deep Work oleh Cal Newport"
			/>
		</div>

		<div>
			<label for="excerpt" class="block text-sm font-medium text-gray-700">Excerpt</label>
			<input
				type="text"
				id="excerpt"
				bind:value={excerpt}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="Meningkatkan fokus di dunia penuh gangguan..."
			/>
		</div>

		<div>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="block text-sm font-medium text-gray-700">Content</label>
			<RichText bind:content />
		</div>

		<div class="flex items-center justify-end space-x-4">
			{#if errorMessage}
				<p class="text-sm text-red-600">{errorMessage}</p>
			{/if}
			{#if successMessage}
				<p class="text-sm text-green-600">{successMessage}</p>
			{/if}

			<button
				type="submit"
				disabled={isLoading}
				class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
			>
				{isLoading ? 'Submitting...' : 'Submit Review'}
			</button>
		</div>
	</form>

	<hr class="my-8" />

	<div class="prose max-w-none">
		<h2>Live Preview</h2>
		<div>{@html content}</div>

		<h2 class="mt-6">HTML Preview</h2>
		<pre class="overflow-x-auto rounded-md p-4"><code>{content}</code></pre>
	</div>
</div>
