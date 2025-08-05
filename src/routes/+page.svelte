<script>
	import { reviews } from '$lib/data/reviews';
</script>

<div class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-4 text-4xl font-bold">
		Selamat datang di <span class="text-[#093FB4]">Ruang Buku Saya</span>
	</h1>
	<p class="mb-8 text-gray-700">
		Kupas tuntas makna di balik setiap kata. Dari pembaca, untuk pembaca.
	</p>

	<h2 class="mb-4 text-2xl font-semibold">Review Terbaru</h2>
	<ul class="space-y-4">
		{#each reviews.slice(0, 3) as review}
			<li class="rounded-lg border p-4 hover:shadow">
				<a
					href={`/reviews/${review.slug}`}
					class="text-xl font-medium text-[#093FB4] hover:underline">{review.title}</a
				>
				<p class="text-sm text-gray-600">{review.excerpt}</p>
			</li>
		{/each}
	</ul>
</div>
