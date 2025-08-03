import { json } from '@sveltejs/kit';
import fs from 'fs/promises'; // Menggunakan Node.js File System module
import type { RequestHandler } from './$types';
import type { Review } from '$lib/data/reviews';

const filePath = 'src/lib/data/reviews.ts';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const newReview: Review = await request.json();

		// Validasi sederhana di sisi server
		if (
			!newReview.title ||
			!newReview.slug ||
			!newReview.content ||
			newReview.content === '<p><br></p>'
		) {
			return json(
				{ success: false, message: 'Title, slug, and content are required.' },
				{ status: 400 }
			);
		}

		// Baca file yang ada
		const fileContent = await fs.readFile(filePath, 'utf-8');

		// Cari posisi untuk menyisipkan data baru (sebelum kurung siku penutup array)
		const insertionPoint = fileContent.lastIndexOf('];');
		if (insertionPoint === -1) {
			throw new Error("Invalid format in reviews.ts: could not find closing '];'");
		}

		// Format entri baru menjadi string JSON
		const newEntryString = `,\n\t${JSON.stringify(newReview, null, '\t')}`;

		// Sisipkan entri baru ke dalam konten file
		const updatedContent =
			fileContent.slice(0, insertionPoint) + newEntryString + fileContent.slice(insertionPoint);

		// Tulis kembali konten yang sudah diperbarui ke file
		await fs.writeFile(filePath, updatedContent, 'utf-8');

		return json({ success: true, message: 'Review added successfully!' }, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ success: false, message: 'Failed to add review.' }, { status: 500 });
	}
};
