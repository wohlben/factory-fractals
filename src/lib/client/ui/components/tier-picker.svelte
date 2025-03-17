<script lang="ts">
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import type { RecipePlanner } from '$lib/client/recipePlanner';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let {recipe, tier, requiredBuildings} = planner

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
			<button class="px-2 py-1 outline-slate-600 hover:bg-slate-700 text-sm  rounded" class:outline-1={availableTier === $tier}
							class:active={availableTier === $tier}
							onclick={() => switchTier(availableTier)}>{availableTier}</button>
		{/each}
	</div>
	{:else}
	<button
		onclick={() => tierSelector = true}
		class="text-center min-w-16 h-10 rounded-l-lg bg-slate-800 hover:bg-slate-700 py-2 px-3 flex justify-around items-end gap-2 relative ">
			<span  class="text-xs text-gray-400 absolute top-0">tier {$tier}</span>
			<b class="bottom-0.5 absolute">{Math.round($requiredBuildings * 100) / 100}</b>
	</button>
{/if}