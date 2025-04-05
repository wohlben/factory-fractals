<script lang="ts">
	import { derived } from 'svelte/store';
	import { assets } from '$app/paths';
	import { DSPData } from '$lib/client/dspdata';
	import ItemIcon from './item-icon.svelte';

	let { recipeId } = $props<{ recipeId: number }>();

	let recipe = $derived(DSPData.recipe[recipeId]);

	const path = $derived(recipe?.IconPath.split('/'));
	const name = $derived(path && path[path.length - 1]);
	const icon = $derived(name && assets + `/dsp_sprites/${name}.png`);
</script>

{#key recipeId}
	{#if name}<img class="h-6" alt="" src={icon} /> {:else}
		<ItemIcon itemId={recipe?.Results?.[0]} />
	{/if}
{/key}
