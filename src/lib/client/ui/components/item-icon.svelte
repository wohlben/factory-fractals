<script lang="ts">
	import { derived } from 'svelte/store';
	import { assets } from '$app/paths';
	import { DSPData } from '$lib/client/dspdata';

	let { itemId, small } = $props<{ itemId: number, small?: boolean }>();

	let item = $derived(DSPData.item[itemId]);

	const path = $derived(item?.IconPath.split('/'));
	const name = $derived(path && path[path.length - 1]);
	const icon = $derived(name && assets + `/dsp_sprites/${name}.png`);
</script>

{#key itemId}
	<img class:h-6={small !== false} alt="" src={icon} />
{/key}
