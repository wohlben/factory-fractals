<script lang="ts">
	import { derived } from 'svelte/store';
	import { assets } from '$app/paths';
	import { DSPData } from '$lib/client/dspdata';

	let { filename } = $props<{ filename: string }>();

	const path = $derived(filename.split('/'));
	const name = $derived(path && path[path.length - 1])
	const icon = $derived(name && assets + `/dsp_sprites/${name}.png`);
</script>

<img class="h-6" alt="" src={icon} />
