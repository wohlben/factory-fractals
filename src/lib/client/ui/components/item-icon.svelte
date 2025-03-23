<script lang="ts">
	import { derived } from 'svelte/store';
	import { assets } from '$app/paths';
	import { DSPData } from '$lib/client/dspdata';

	let { itemId } = $props<{ itemId: number }>();

	let item = $derived(DSPData.item[itemId]);

	const path = $derived(item?.IconPath.split('/'));
	const name = $derived(path && path[path.length - 1])
	const icon = $derived(name && assets + `/dsp_sprites/${name}.png`);
</script>

<img class="h-6" alt="" src={icon} />
