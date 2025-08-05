<script lang="ts">
	export let data: {
		review: {
			title: string;
			date: string;
			content: string;
			author: string;
		};
	};

	const { review } = data;
</script>

<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<header class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">{review.title}</h1>
		<!-- <p class="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p> -->
		<p class="text-sm text-gray-500">
			Ditulis oleh <span class="font-medium text-gray-700">{review.author}</span> pada
			{new Date(review.date).toLocaleString('id-ID', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>
	</header>

	<article class="prose prose-sky prose-lg max-w-none">
		{@html review.content}
	</article>
</div>
