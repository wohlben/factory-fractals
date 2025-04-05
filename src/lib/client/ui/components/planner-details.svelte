<script lang="ts">
	import { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import PlannerDetailRecipeItem from './planner-detail-recipe-item.svelte'

	let { planner, devisor } = $props<{ planner: RecipePlanner, devisor: number }>();
	let {
		requiredBuildingsByRecipeId,
		fabsByType,
		recipe,
		requiredBuildings,
		deficitByItemId
	} = planner as RecipePlanner;
	let { defaultTier } = FactoryGlobals;


	let devidedRequiredBuildings = $derived(Math.ceil($requiredBuildings / devisor))
</script>

<div>

	<h5 class="dark:bg-blue-900 bg-blue-300 text-center py-1 px-4 mt-4 mb-2">Buildings</h5>
	<div class="mb-4 my-4 mx-auto  grid grid-cols-2 gap-x-8 justify-center px-0.5">
		{#each Object.entries($fabsByType) as allFabs, index}
			{@const [fabType, requiredFabs] = allFabs}
			<div class="flex gap-4 dark:hover:bg-gray-700 hover:bg-gray-300">
				<span>{fabType}</span>
				<span class="text-right flex-grow">{Math.ceil(requiredFabs/devisor)}</span>
			</div>
		{/each}
	</div>

	<h5 class="dark:bg-blue-900 bg-blue-300 text-center py-1 px-4 mt-4 mb-2">Recipes</h5>

	{#each Object.entries($requiredBuildingsByRecipeId ?? {}) as allRequiredBuildings}
		{@const [recipeId, requiredBuildings] = allRequiredBuildings}
		<PlannerDetailRecipeItem {recipeId} {requiredBuildings} {devisor}></PlannerDetailRecipeItem>

	{/each}
	<h5 class="dark:bg-blue-900 bg-blue-300 text-center py-1 px-4 mt-4 mb-2">ingress</h5>
	<div class="mx-auto  grid grid-cols-2 gap-x-8 justify-center px-0.5">
		{#each Object.entries($deficitByItemId) as missingItems}
			{@const [itemId] = missingItems}
			<div class="flex gap-4 dark:hover:bg-gray-700 hover:bg-gray-300 px-1">
				<span>{DSPData.item[itemId].Name}</span>
			</div>
		{/each}
	</div>
</div>

