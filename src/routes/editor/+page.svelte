<script lang="ts">
import RichText from '$lib/components/RichText.svelte';

let content = '<p>Hello <strong>Quill!</strong></p>';
</script>

<div class="container mx-auto p-6">
  <h1 class="text-center pb-3">Rich Text Editor</h1>
  <RichText bind:content={content} />

  <h2>Live Preview</h2>
  <div>{@html content}</div>

  <br>

  <h2>HTML Preview</h2>
  <div>{content}</div>
</div>
