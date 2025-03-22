<script lang="ts">
	import { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';
	import { FactoryGlobals } from '$lib/client/factory-globals';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let { requiredBuildingsByRecipeId, fabsByType, recipe, requiredBuildings } = planner;
	let { defaultTier } = FactoryGlobals;
	let dfabs = $derived(Object.entries($fabsByType));

</script>

<div>
	<h3 class="bg-blue-800 py-2 px-4  text-center "><span class="w-14 text-right">{$requiredBuildings}</span> <span class="text-xs text-slate-400">x</span> {$recipe.Name}</h3>

	<div class="mb-4 my-4 mx-auto  grid grid-cols-2 gap-x-8 justify-center">
		{#each dfabs as allFabs, index}
			{@const [fabType, requiredFabs] = allFabs}
			<div class="flex gap-4">
				<span>{fabType}</span>
				<span class="text-right flex-grow">{requiredFabs}</span>
			</div>
		{/each}
	</div>


	{#each Object.entries($requiredBuildingsByRecipeId) as allRequiredBuildings}
		{@const [recipeId, requiredBuildings] = allRequiredBuildings}
		{#if (recipeId)}
			{@const recipe = DSPData.recipe[Number(recipeId)]}
			{@const relativeSpeed = $defaultTier[recipe.Type] / recipe.TimeSpend}
			{@const resultCounts = recipe.ResultCounts.reduce((acc, i) => i + acc, 0)}
			{@const outputsPerSecond = requiredBuildings * relativeSpeed * resultCounts * 60}
			<div class="flex odd:bg-gray-950 gap-2 px-2 items-center">
				<span class="w-14 text-right">{requiredBuildings}</span>
				<span class="text-slate-300 text-xs"> x </span>

				<span>{recipe?.Name ?? "recipe" + recipeId }</span>
				<span class="text-slate-400 text-xs">tier {$defaultTier[recipe.Type]}</span>
				<em class="text-right flex-grow">{outputsPerSecond}/s</em>
			</div>
		{/if}
	{/each}
</div>

