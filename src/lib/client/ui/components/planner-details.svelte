<script lang="ts">
	import { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import PlannerDetailRecipeItem from './planner-detail-recipe-item.svelte'

	let { planner } = $props<{ planner: RecipePlanner }>();
	let {
		requiredBuildingsByRecipeId,
		fabsByType,
		recipe,
		requiredBuildings,
		deficitByItemId
	} = planner as RecipePlanner;
	let { defaultTier } = FactoryGlobals;

	let devisorInput = $state(1);
	let devisor = $derived(!devisorInput || isNaN(devisorInput)  ?  1 : devisorInput);

	let devidedRequiredBuildings = $derived(Math.ceil($requiredBuildings / devisor))
</script>

<div>
	<h3 class="bg-blue-800 py-2 px-4  text-center ">
		<input bind:value={devisorInput} type="number" >
		<span
			class="text-xs text-slate-400">x</span>

		<span class="w-14 text-right">{devidedRequiredBuildings}</span>
		<span class="text-xs text-slate-400">x</span>
		<span>{$recipe.Name}</span>
	</h3>

	<h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Buildings</h5>
	<div class="mb-4 my-4 mx-auto  grid grid-cols-2 gap-x-8 justify-center px-0.5">
		{#each Object.entries($fabsByType) as allFabs, index}
			{@const [fabType, requiredFabs] = allFabs}
			<div class="flex gap-4 hover:bg-gray-700">
				<span>{fabType}</span>
				<span class="text-right flex-grow">{Math.ceil(requiredFabs/devisor)}</span>
			</div>
		{/each}
	</div>

	<h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Recipes</h5>

	{#each Object.entries($requiredBuildingsByRecipeId ?? {}) as allRequiredBuildings}
		{@const [recipeId, requiredBuildings] = allRequiredBuildings}
		<PlannerDetailRecipeItem {recipeId} {requiredBuildings} {devisor}></PlannerDetailRecipeItem>

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

