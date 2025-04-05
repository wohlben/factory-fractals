<script lang="ts">
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import ItemIcon from '$lib/client/ui/components/item-icon.svelte';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let {recipe, tier, requiredBuildings} = planner
	let { defaultTier } = FactoryGlobals;


	let tierSelector = $state(false);
	const switchTier = (availableTier: number) => {
		planner.tier.set(availableTier);
		tierSelector = false;
	}

</script>
{#if (tierSelector)}
	<div>
		<span class="text-xs text-gray-400">Tier</span>
		{#each FactoryGlobals.availableTiers[$recipe.Type] as availableTier}
			<button class="px-2 py-1 outline-slate-600 dark:hover:bg-slate-600 hover:bg-slate-400 text-sm  rounded" class:outline-1={availableTier === $tier}
							class:active={availableTier === $tier}
							onclick={() => switchTier(availableTier)}>{availableTier} <ItemIcon itemId={FactoryGlobals.factoryItems[$recipe?.Type][availableTier]} /> </button>
		{/each}
	</div>
	{:else}
	<button
		onclick={() => tierSelector = true}
		class="text-center min-w-16 h-10 rounded-l-lg dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-600 hover:bg-slate-400 py-2 px-3 flex justify-around items-end gap-2 relative  ">

		<span class="top-0 absolute left-0 scale-75 opacity-50"><ItemIcon itemId={FactoryGlobals.factoryItems[$recipe?.Type][$tier]} /></span>

		<span  class="text-xs text-gray-400 absolute top-0">tier {$tier}</span>
		<b class="bottom-0.5 absolute">{Math.round($requiredBuildings * 100) / 100}</b>
	</button>
{/if}