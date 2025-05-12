<script lang="ts">
	export let data: {
		review: {
			title: string;
			date: string;
			content: string;
		};
	};

	const { review } = data;
</script>

<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<header class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">{review.title}</h1>
		<p class="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
	</header>

	<article class="prose prose-sky prose-lg max-w-none">
		{@html review.content}
	</article>
</div>
