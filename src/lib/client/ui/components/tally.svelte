<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';
	import type { Readable } from 'svelte/store';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import ItemIcon from './item-icon.svelte';
	import ConveyorCount from './conveyor-count.svelte';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let { requiredBuildingsByRecipeId, itemId }: {
		requiredBuildingsByRecipeId: Readable<Record<number, number>>,
		itemId: Readable<number>,
		timeSpend: Readable<number>,
	} = planner;
	let { defaultTier } = FactoryGlobals;

	const requiredConveyor = (outputs: number) => {
		switch (true) {
			case outputs <= 6:
				return [[2001, 1]];
			case outputs <= 12:
				return [[2002, 1]];
			case outputs <= 30:
				return [[2003, 1]];
			default:
				const stacked = Math.ceil(Math.ceil(outputs) / 30);
				const conveyors = Math.ceil(stacked / 4);
				return [[2014, stacked % 4], [2003, conveyors]];
		}
	};

	let activeTally = $state<'throughput' | 'bulidings'>('bulidings');

</script>

<div class="md:max-w-sm w-full flex flex-col mx-auto lg:ml-0 gap-0.5">
	<h4 class="px-4 py-2 dark:bg-slate-800 bg-slate-200 rounded-t-lg flex items-center">
		<span class="flex-grow">required</span>
		<button class=" px-4 py-2 rounded-l-lg  outline-gray-600 "
						class:bg-blue-300={activeTally === 'bulidings'}
						class:bg-gray-300={activeTally !== 'bulidings'}
						class:hover:bg-blue-500={activeTally === 'bulidings'}
						class:hover:bg-gray-500={activeTally !== 'bulidings'}
						class:dark:bg-blue-700={activeTally === 'bulidings'}
						class:dark:bg-gray-700={activeTally !== 'bulidings'}

						onclick={() => activeTally = 'bulidings'}> buildings
		</button>
		<button class="hover:bg-slate-500 px-4 py-2  rounded-r-lg  outline-gray-600"
						class:bg-blue-300={activeTally === 'throughput'}
						class:bg-gray-300={activeTally !== 'throughput'}

						class:dark:bg-blue-700={activeTally === 'throughput'}
						class:dark:bg-gray-700={activeTally !== 'throughput'}
						class:hover:bg-blue-500={activeTally === 'throughput'}
						class:hover:bg-gray-500={activeTally !== 'throughput'}

						onclick={() => activeTally = 'throughput'}> conveyors
		</button>
	</h4>
	{#key $itemId}
		{#each Object.entries($requiredBuildingsByRecipeId) as allRequiredBuildings}
			{@const [recipeId, requiredBuildings] = allRequiredBuildings}
			{#if (recipeId)}
				{@const recipe = DSPData.recipe[Number(recipeId)]}
				{@const relativeSpeed = $defaultTier[recipe.Type] / recipe.TimeSpend}
				<div class="dark:odd:bg-gray-950 odd:bg-gray-200 py-1">

					<div class="gap-3 px-2 flex items-center justify-between">
						<div class="justify-self-center w-14 text-center p-0.5 flex flex-col">
							{#each recipe.Results as resultItemId, index }
								{@const outputsPerSecond = requiredBuildings * relativeSpeed * recipe.ResultCounts[index] * 60}
								<div class="relative">

									<em
										class="absolute w-full h-full text-right left-0 top-0 dark:backdrop-brightness-85 bg-white/50 dark:bg-black/30 ">
										{Math.round(outputsPerSecond * 100) / 100}/s
									</em>
									<ItemIcon itemId={resultItemId} />

								</div>
							{/each}

						</div>
						<span class="flex-grow">{recipe?.Name ?? "recipe" + recipeId}</span>
						{#if activeTally === 'bulidings'}
							{@const roundedbuildings = String(Math.round(requiredBuildings * 10) / 10) }
							{@const decimalIndex = roundedbuildings.indexOf(".")}
							{@const padPositions = decimalIndex === -1 ? 1 : 0}

							<div class="text-right justify-self-end relative w-16" style="padding-right: {padPositions + (0.5)}em">
								<div class="absolute right-0 top-0 z-0">
									{#key $defaultTier}
										<div class="opacity-70 scale-90">
											<ItemIcon
												itemId={FactoryGlobals.factoryItems[recipe?.Type as keyof typeof FactoryGlobals.factoryItems][$defaultTier[recipe.Type] as keyof typeof FactoryGlobals.factoryItems[keyof typeof FactoryGlobals.factoryItems]]} />
										</div>
									{/key}
								</div>

								<span
									class="w-full h-full text-right top-0 dark:backdrop-brightness-75 z-40">{roundedbuildings}</span>
							</div>

						{:else if activeTally === 'throughput'}
							{#each recipe.Results as resultItemId, index }
								{@const outputsPerSecond = requiredBuildings * relativeSpeed * recipe.ResultCounts[index] * 60}
								<div class="flex flex-col">
									<ConveyorCount outputs={outputsPerSecond}></ConveyorCount>

								</div>

							{/each}
						{/if}
					</div>
				</div>

			{/if}
		{/each}
	{/key}

</div>
