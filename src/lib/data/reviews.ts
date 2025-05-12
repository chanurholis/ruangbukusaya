export type Review = {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
};

export const reviews: Review[] = [
	{
		slug: 'atomic-habits',
		title: 'Atomic Habits oleh James Clear',
		date: '2024-05-01',
		excerpt: 'Panduan praktis membangun kebiasaan positif...',
		content: `
			<p><strong>Atomic Habits</strong> menjelaskan bagaimana kebiasaan kecil dapat membawa perubahan besar.</p>
			<p>Buku ini membahas sistem, bukan sekadar tujuan.</p>
		`
	},
	{
		slug: 'deep-work',
		title: 'Deep Work oleh Cal Newport',
		date: '2024-04-20',
		excerpt: 'Meningkatkan fokus di dunia penuh gangguan...',
		content: `
			<p><strong>Deep Work</strong> mengajak kita mengelola distraksi dan menciptakan waktu berkualitas untuk pekerjaan mendalam.</p>
		`
	}
];
