<script lang="ts">

	import { RecipePlanner } from '$lib/client/recipePlanner';
	import type { PageProps } from './$types';
	import Planner from '$lib/client/ui/components/planner.svelte';
	import RecipeList from '$lib/client/ui/components/recipe-list.svelte';
	import FactoryGlobalsC from '$lib/client/ui/components/factory-globals.svelte';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import { derived, get } from 'svelte/store';
	import Tally from '$lib/client/ui/components/tally.svelte';

	let { data }: PageProps = $props();

	let { defaultTier } = FactoryGlobals;


	let planner = $derived(new RecipePlanner(data.recipeId, undefined, undefined, undefined, undefined, data.depth, data.targetAmount));
	let { targetInterval, recipe, timeSpend, timeSpendChanged, tier, children, header } = $derived(planner);

	const ONE_MINUTE = 60 * 60;
	let dialogOpen = $state(false);


	const applyToAll = (pnr?: RecipePlanner) => {
		if (!pnr) pnr = planner;
		const recipe = get(pnr!.recipe);
		if (recipe) {
			const recipeType = recipe.Type;
			const currentDefault = $defaultTier[recipeType];
			pnr!.tier.set(currentDefault);
		}
		get(pnr!.children).forEach(child => applyToAll(child));

		dialogOpen = false;
	};

</script>
<svelte:head>
	<link rel="icon" href={$header?.[0]} />
	<title>{$header?.[1]}</title>

</svelte:head>


{#if (dialogOpen)}
	<button onclick={() => dialogOpen = false}
					class="fixed overscroll-contain w-screen h-screen backdrop-blur-2xl dark:bg-black opacity-70 top-0 left-0 z-40"
					aria-label="close">
	</button>
	<dialog open
					class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2 fixed outline-1 rounded-2xl outline-slate-600">
		<h6 class="flex items-center justify-between"><span>Factory Globals</span>
			<button onclick={() => dialogOpen = false}
							class="dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-200 hover:bg-slate-300 w-12 py-2">✖️
			</button>
		</h6>
		<FactoryGlobalsC></FactoryGlobalsC>

		<span class="flex-grow"></span>
		<button class="dark:bg-green-800 dark:hover:bg-green-700  bg-green-200 hover:bg-green-300 w-full py-1"
						onclick={() => applyToAll()}>apply to existing
		</button>
		<button class="dark:bg-green-800 dark:hover:bg-green-700 bg-green-200 hover:bg-green-300 w-full py-1"
						onclick={() => dialogOpen = false}>apply to future
		</button>

	</dialog>
{/if}

<div class="flex gap-12 flex-wrap lg:flex-nowrap">

	<div class="lg:max-w-sm lg:block hidden max-h-screen  ml-auto overflow-y-auto">
		<RecipeList></RecipeList>
	</div>

	<div class="max-w-2xl w-full lg:mx-0 mx-auto">
		<div class="flex  text-sm py-1">
		<span class="px-3 py-1 dark:bg-slate-800 bg-slate-200 rounded-r-lg">Items per
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
			<button class="px-3 py-3 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 rounded-l-lg"
							onclick={() => dialogOpen = true}> ⚙️
				Required Fabs to Process
				Items
			</button>
		</div>

		{#key planner}
			<Planner {planner}></Planner>
		{/key}

	</div>
	{#key planner}
		<Tally planner={planner} />
	{/key}

</div>

