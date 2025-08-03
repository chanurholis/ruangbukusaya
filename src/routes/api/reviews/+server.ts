import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import type { RequestHandler } from './$types';
import type { Review } from '$lib/data/reviews';

const filePath = 'src/lib/data/reviews.ts';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const newReview: Review = await request.json();

		// Validasi sisi server
		if (
			!newReview.title ||
			!newReview.slug ||
			!newReview.content ||
			newReview.content.trim() === '<p><br></p>'
		) {
			return json(
				{ success: false, message: 'Title, slug, and content are required.' },
				{ status: 400 }
			);
		}

		// Baca file yang ada
		const fileContent = await fs.readFile(filePath, 'utf-8');

		// Cari posisi array di dalam file
		const arrayStartIndex = fileContent.indexOf('[');
		const arrayEndIndex = fileContent.lastIndexOf(']');

		if (arrayStartIndex === -1 || arrayEndIndex === -1) {
			throw new Error("Invalid format in reviews.ts: could not find array brackets '[]'.");
		}

		// Periksa apakah ada konten di antara kurung siku untuk menentukan apakah array kosong
		const arrayContent = fileContent.substring(arrayStartIndex + 1, arrayEndIndex).trim();
		const isArrayEmpty = arrayContent.length === 0;

		// Format entri baru. Jangan tambahkan koma di depan jika array kosong.
		const newEntryString = `${isArrayEmpty ? '' : ','}\n\t${JSON.stringify(newReview, null, '\t')}`;

		// Sisipkan entri baru tepat sebelum kurung siku penutup ']'
		const updatedContent =
			fileContent.slice(0, arrayEndIndex) + newEntryString + fileContent.slice(arrayEndIndex);

		// Tulis kembali file dengan konten yang sudah diperbarui
		await fs.writeFile(filePath, updatedContent, 'utf-8');

		return json({ success: true, message: 'Review added successfully!' }, { status: 201 });
	} catch (error) {
		// Log error yang sebenarnya ke konsol server untuk debugging
		console.error('Error adding review:', error);
		// Kirim pesan error umum ke klien
		return json(
			{ success: false, message: 'Failed to add review. Check server logs for details.' },
			{ status: 500 }
		);
	}
};
