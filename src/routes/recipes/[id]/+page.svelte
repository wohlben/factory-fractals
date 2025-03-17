<script lang="ts">

	import { RecipePlanner } from '$lib/client/recipePlanner';
	import type { PageProps } from './$types';
	import Planner from '$lib/client/ui/components/planner.svelte';
	import RecipeList from '$lib/client/ui/components/recipe-list.svelte';
	import FactoryGlobals from '$lib/client/ui/components/factory-globals.svelte';
	import { derived } from 'svelte/store';

	let { data }: PageProps = $props();

	let planner = $derived(new RecipePlanner(data.recipeId));
	let { targetInterval, recipe, timeSpend, timeSpendChanged } = $derived(planner);

	const ONE_MINUTE = 60 * 60;
	let dialogOpen = $state(false);

</script>

{#if (dialogOpen)}
	<dialog open
					class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2">
		<FactoryGlobals></FactoryGlobals>

		<span class="flex-grow"></span>
		<button class="bg-green-800 w-full py-1" onclick={() => dialogOpen = false}>OK</button>

	</dialog>
{/if}

<div class="flex gap-12">

	<div class="max-w-sm lg:block hidden max-h-screen  ml-auto overflow-y-auto">
		<RecipeList></RecipeList>
	</div>

	<div class="max-w-2xl w-full mr-auto ml-auto lg:ml-0">
		<div class="flex  text-sm py-1">
		<span class="px-3 py-3 bg-slate-800 rounded-r-lg">Items per
			<span class="inline-flex">
						<button class="px-1.5 multi" class:animate-flash={$timeSpendChanged}
										class:active={$targetInterval === $timeSpend}
										onclick={() => planner.setInterval(0)}>
							Cycle ({ Math.round($timeSpend / 60 * 100) / 100 }s)
						</button>

		      <button class="px-1.5 multi" class:active={$targetInterval === ONE_MINUTE}
									onclick={() => planner.setInterval(ONE_MINUTE)}>Minute</button>
				{#if ($timeSpend !== 60) }
				    	<button class="px-1.5 multi" class:active={$targetInterval === 60}
											onclick={() => planner.setInterval(60)}>Second</button>
					{/if}
			</span>

	 </span>
			<span class="px-3 py-3 flex-grow text-right" ></span>
			<button class="px-3 py-3 bg-slate-800 rounded-l-lg" onclick={() => dialogOpen = true}> ⚙️ Required Fabs to Process Items</button>
		</div>

		{#key planner}
			<Planner {planner}></Planner>
		{/key}

	</div>


</div>

