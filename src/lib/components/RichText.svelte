<script context="module" lang="ts">
	// Disable SSR for this component
	export const ssr = false;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import type Quill from 'quill';

	let editorElem: HTMLDivElement;
	let quill: Quill;

	export let content: string = '';
	export let readOnly: boolean = false;

	// Prevent local update loop
	let isUpdating = false;

	onMount(async () => {
		const Quill = (await import('quill')).default;

		quill = new Quill(editorElem, {
			theme: 'snow',
			readOnly
		});

		// Set initial content safely
		quill.root.innerHTML = content;

		// Update binding on content change
		quill.on('text-change', () => {
			isUpdating = true;
			content = quill.root.innerHTML;
		});
	});

	// Sync external content prop → editor
	$: if (quill && !isUpdating && quill.root.innerHTML !== content) {
		quill.root.innerHTML = content;
	}

	// Reset update flag after reactive block runs
	$: isUpdating = false;
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={editorElem} style="min-height: 200px;" class="quill-editor" />
