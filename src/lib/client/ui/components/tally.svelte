<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';
	import type { Readable } from 'svelte/store';
	import { FactoryGlobals } from '$lib/client/factory-globals';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let { requiredBuildingsByRecipeId, itemId }: {
		requiredBuildingsByRecipeId: Readable<Record<number, number>>,
		itemId: Readable<number>,
		timeSpend: Readable<number>,
	} = planner;
	let {defaultTier} = FactoryGlobals;

</script>
<div class="max-w-sm flex flex-col mr-auto gap-0.5">
	<h4 class="px-4 py-2 bg-slate-800 rounded-t-lg">all required buildings</h4>
	{#key $itemId}
		{#each Object.entries($requiredBuildingsByRecipeId) as allRequiredBuildings}
			{@const [recipeId, requiredBuildings] = allRequiredBuildings}
			{#if (recipeId)}
				{@const recipe = DSPData.recipe[Number(recipeId)]}
				{@const relativeSpeed = $defaultTier[recipe.Type] / recipe.TimeSpend}
				{@const resultCounts = recipe.ResultCounts.reduce((acc, i) => i + acc, 0)}
				{@const outputsPerSecond = requiredBuildings * relativeSpeed * resultCounts * 60}
				<div class="flex odd:bg-gray-950 gap-2 px-2">
					<span class="flex-grow">{recipe?.Name ?? "recipe" + recipeId }</span>
					<span>{Math.round(requiredBuildings * 100) / 100}</span>
					<em>{Math.round(outputsPerSecond * 100) / 100}/s</em>
				</div>
			{/if}

		{/each}
	{/key}
</div>
