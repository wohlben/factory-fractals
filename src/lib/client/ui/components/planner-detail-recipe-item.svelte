<script lang="ts">
	import { DSPData } from '$lib/client/dspdata';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import ConveyorCount from "./conveyor-count.svelte"

	let { defaultTier } = FactoryGlobals;

	let { recipeId, requiredBuildings, devisor } = $props<{
		recipeId: number,
		requiredBuildings: number,
		devisor: number
	}>();
	let doDevide = $state(true);

	let recipe = $derived(DSPData.recipe[Number(recipeId)]);
	let relativeSpeed = $derived($defaultTier[recipe.Type] / recipe.TimeSpend);
	let resultCounts = $derived(recipe.ResultCounts.reduce((acc, i) => i + acc, 0));
	let outputsPerSecond = $derived(requiredBuildings * relativeSpeed * resultCounts * 60 / (doDevide ? devisor : 1));
	let roundedOutputsPerSecond = $derived(Math.round(outputsPerSecond * 100) / 100)

</script>

<button onclick={() => doDevide = !doDevide} class="flex  dark:odd:bg-gray-950 odd:bg-gray-100 gap-2 px-2 items-center dark:hover:bg-gray-700 hover:bg-gray-300 w-full group ">
	<span class="w-4 group-hover:opacity-100" class:opacity-0={doDevide}>{#if doDevide}🔓 {:else}🔒{/if}</span>

	<span class="w-14 text-right">{Math.round(requiredBuildings / (doDevide ? devisor : 1) * 100) / 100}</span>
	<span class="text-slate-300 text-xs"> x </span>

	<span>{recipe?.Name ?? "recipe" + recipeId }</span>
	<span class="text-slate-400 text-xs ">tier {$defaultTier[recipe.Type]}</span>

	<em class="text-right flex-grow">{ roundedOutputsPerSecond  }/s</em>
	<span class="flex w-18 justify-end gap-1">
		<ConveyorCount outputs={outputsPerSecond}></ConveyorCount>

	</span>

</button>
