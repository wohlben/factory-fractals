<script lang="ts">
	import { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';
	import { FactoryGlobals } from '$lib/client/factory-globals';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let { requiredBuildingsByRecipeId, fabsByType, recipe, requiredBuildings, deficitByItemId } = planner;
	let { defaultTier } = FactoryGlobals;
</script>

<div>
	<h3 class="bg-blue-800 py-2 px-4  text-center "><span class="w-14 text-right">{Math.round($requiredBuildings * 100)/100}</span> <span class="text-xs text-slate-400">x</span> {$recipe.Name}</h3>

	<h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Buildings</h5>
	<div class="mb-4 my-4 mx-auto  grid grid-cols-2 gap-x-8 justify-center px-0.5">
		{#each Object.entries($fabsByType) as allFabs, index}
			{@const [fabType, requiredFabs] = allFabs}
			<div class="flex gap-4 hover:bg-gray-700">
				<span>{fabType}</span>
				<span class="text-right flex-grow">{requiredFabs}</span>
			</div>
		{/each}
	</div>

	<h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Recipes</h5>

	{#each Object.entries($requiredBuildingsByRecipeId?? {}) as allRequiredBuildings}
		{@const [recipeId, requiredBuildings] = allRequiredBuildings}
		{#if (recipeId)}
			{@const recipe = DSPData.recipe[Number(recipeId)]}
			{@const relativeSpeed = $defaultTier[recipe.Type] / recipe.TimeSpend}
			{@const resultCounts = recipe.ResultCounts.reduce((acc, i) => i + acc, 0)}
			{@const outputsPerSecond = requiredBuildings * relativeSpeed * resultCounts * 60}
			<div class="flex odd:bg-gray-950 gap-2 px-2 items-center hover:bg-gray-700 ">
				<span class="w-14 text-right">{Math.round(requiredBuildings * 100)/100}</span>
				<span class="text-slate-300 text-xs"> x </span>

				<span>{recipe?.Name ?? "recipe" + recipeId }</span>
				<span class="text-slate-400 text-xs">tier {$defaultTier[recipe.Type]}</span>
				<em class="text-right flex-grow">{Math.round(outputsPerSecond*100)/100}/s</em>
			</div>
		{/if}
	{/each}
	<h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">ingress</h5>
	<div class="mx-auto  grid grid-cols-2 gap-x-8 justify-center px-0.5">
		{#each Object.entries($deficitByItemId) as missingItems}
			{@const [itemId] = missingItems}
			<div class="flex gap-4 hover:bg-gray-700 px-1">
				<span>{DSPData.item[itemId].Name}</span>
			</div>
		{/each}
	</div>
</div>

