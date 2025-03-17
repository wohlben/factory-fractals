<script lang="ts">

	import { RecipePlanner } from '$lib/client/recipePlanner';
	import type { PageProps } from './$types';
	import Planner from '$lib/client/ui/components/planner.svelte';
	import RecipeList from '$lib/client/ui/components/recipe-list.svelte';
	import FactoryGlobalsC from '$lib/client/ui/components/factory-globals.svelte';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import { derived, get } from 'svelte/store';

	let { data }: PageProps = $props();

	let planner = $derived(new RecipePlanner(data.recipeId, undefined, undefined, undefined, undefined, data.depth, data.targetAmount));
	let { targetInterval, recipe, timeSpend, timeSpendChanged, tier, children } = $derived(planner);

	const ONE_MINUTE = 60 * 60;
	let dialogOpen = $state(false);


	const applyToAll = (pnr?: RecipePlanner) => {
		if (!pnr) pnr = planner;
		const recipe = get(pnr.recipe);
		if (recipe) {
			const recipeType = recipe.Type;
			const currentDefault = get(FactoryGlobals.defaultTier[recipeType]);
			pnr.tier.set(currentDefault);
		}
		get(pnr.children).forEach(child => applyToAll(child));

		dialogOpen = false;
	};

</script>

{#if (dialogOpen)}
	<dialog open
					class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2">
		<FactoryGlobalsC></FactoryGlobalsC>

		<span class="flex-grow"></span>
		<button class="bg-green-800 hover:bg-green-700 w-full py-1" onclick={() => applyToAll()}>apply to existing</button>
		<button class="bg-green-800 hover:bg-green-700 w-full py-1" onclick={() => dialogOpen = false}>apply to future</button>

	</dialog>
{/if}

<div class="flex gap-12">

	<div class="max-w-sm lg:block hidden max-h-screen  ml-auto overflow-y-auto">
		<RecipeList></RecipeList>
	</div>

	<div class="max-w-2xl w-full mr-auto ml-auto lg:ml-0">
		<div class="flex  text-sm py-1">
		<span class="px-3 py-1 bg-slate-800 rounded-r-lg">Items per
			<span class="inline-flex">
						<button class="px-1.5 py-2 multi hover:bg-slate-700" class:animate-flash={$timeSpendChanged}
										class:active={$targetInterval === $timeSpend}
										onclick={() => planner.setInterval(0)}>
							Cycle ({ Math.round($timeSpend / 60 * 100) / 100 }s)
						</button>

		      <button class="px-1.5 py-2 multi hover:bg-slate-700" class:active={$targetInterval === ONE_MINUTE}
									onclick={() => planner.setInterval(ONE_MINUTE)}>Minute</button>
				{#if ($timeSpend !== 60) }
				    	<button class="px-1.5 py-2 multi hover:bg-slate-700" class:active={$targetInterval === 60}
											onclick={() => planner.setInterval(60)}>Second</button>
					{/if}
			</span>

	 </span>
			<span class="px-3 py-3 flex-grow text-right"></span>
			<button class="px-3 py-3 bg-slate-800 hover:bg-slate-700 rounded-l-lg" onclick={() => dialogOpen = true}> ⚙️ Required Fabs to Process
				Items
			</button>
		</div>

		{#key planner}
			<Planner {planner}></Planner>
		{/key}

	</div>


</div>

