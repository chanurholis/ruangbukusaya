<script>
	import { reviews } from '$lib/data/reviews';
</script>

<div class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold">Semua Review Buku</h1>
	<ul class="space-y-4">
		{#each reviews as review}
			<li class="rounded-lg border p-4 hover:shadow">
				<a
					href={`/reviews/${review.slug}`}
					class="text-xl font-semibold text-blue-500 hover:underline">{review.title}</a
				>
				<p class="text-sm text-gray-600">{review.excerpt}</p>
			</li>
		{/each}
	</ul>
</div>
