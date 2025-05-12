import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { reviews } from '$lib/data/reviews';

export const load: PageLoad = ({ params }) => {
	const review = reviews.find((r) => r.slug === params.slug);

	if (!review) {
		throw error(404, 'Review tidak ditemukan');
	}

	return { review };
};
