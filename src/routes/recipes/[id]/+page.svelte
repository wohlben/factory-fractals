<script lang="ts">

	import { RecipePlanner } from '$lib/client/recipePlanner';
	import type { PageProps } from './$types';
	import Planner from '$lib/client/ui/components/planner.svelte';
	import RecipeList from '$lib/client/ui/components/recipe-list.svelte';
	import FactoryGlobalsC from '$lib/client/ui/components/factory-globals.svelte';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import { derived, get } from 'svelte/store';
	import Tally from '$lib/client/ui/components/tally.svelte';
	import Dialog from '$lib/client/ui/components/dialog.svelte';

	let { data }: PageProps = $props();

	let { defaultTier } = FactoryGlobals;


	let planner = $derived(new RecipePlanner(data.recipeId, undefined, undefined, undefined, undefined, data.depth, data.targetAmount));
	let { targetInterval, recipe, timeSpend, timeSpendChanged, tier, children, header } = $derived(planner);

	const ONE_MINUTE = 60 * 60;
	let dialogOpen = $state(false);
	let searchAbsolute = $state(false);


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

	let recipeName = $state('');

</script>
<svelte:head>
	<link rel="icon" href={$header?.[0]} />
	<title>{$header?.[1]}</title>

</svelte:head>


{#if (dialogOpen)}
	{#snippet dialogHeader()}
		<span class="dark:bg-slate-700/70 bg-slate-300/70 w-full py-2 px-12">		Factory Globals
</span>
	{/snippet}
	<Dialog close={() => dialogOpen = false} header={dialogHeader}>
		<div class="md:px-5 flex flex-col  gap-2 ">
			<FactoryGlobalsC></FactoryGlobalsC>

			<span class="flex-grow"></span>
			<button class="dark:bg-green-800 dark:hover:bg-green-700  bg-green-300 hover:bg-green-400 w-full py-1"
							onclick={() => applyToAll()}>apply to existing
			</button>
			<button class="dark:bg-green-800 dark:hover:bg-green-700 bg-green-300 hover:bg-green-400 w-full py-1"
							onclick={() => dialogOpen = false}>apply to future
			</button>

		</div>

	</Dialog>
{/if}

<div class="flex gap-12 flex-wrap lg:flex-nowrap">

	<div class="lg:max-w-xs lg:block hidden max-h-screen  ml-auto overflow-y-auto scrollbar-thin ">
		<RecipeList></RecipeList>
	</div>

	<div class="max-w-2xl w-full lg:mx-0 mx-auto overflow-y-auto max-h-screen   scrollbar-thin">
		<div class="flex  text-sm py-1 gap-2 sticky top-0 z-10 bg-slate-50/70 dark:bg-slate-950/70">
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
			<button class="px-3 py-3  bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg lg:hidden"
							class:dark:bg-slate-600={searchAbsolute} class:dark:bg-slate-800={!searchAbsolute}
							onclick={() => searchAbsolute = !searchAbsolute}>{!searchAbsolute ? '🔍' : '✖️' }
			</button>
			<button class="px-3 py-3 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 rounded-l-lg"
							onclick={() => dialogOpen = true}> ⚙️
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

{#if (searchAbsolute)}
	{#snippet dialogHeader()}
		<div class="flex w-full px-12 py-0.5 dark:bg-blue-700/70 bg-blue-300/70 ">
			<label for="recipeName" class="py-2 text-center w-1/3 ">ingredient or recipe name</label>
			<input id=recipeName class="flex-grow"
						 bind:value={recipeName} />
		</div>
	{/snippet}
	<Dialog close={() => searchAbsolute = false} header={dialogHeader}>
		<RecipeList recipeName={recipeName}></RecipeList>

	</Dialog>

{/if}
