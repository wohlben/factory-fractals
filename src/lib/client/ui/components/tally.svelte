<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';
	import { type Readable, writable } from 'svelte/store';
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import ItemIcon from './item-icon.svelte';
	import ConveyorCount from './conveyor-count.svelte';
	import ButtonGroup from './button-group.svelte'

	let { planner, activeTally: passedInActiveTally } = $props<{ planner: RecipePlanner, activeTally: string }>();
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


	let tallyOptions = [
		{label: 'buildings', select: () => activeTallyInput = 'buildings'},
		{label: 'throughput', select: () => activeTallyInput = 'throughput'},
	]
	let activeTallyInput = $state<typeof tallyOptions['label']>('buildings');
	let activeTally = $derived(passedInActiveTally ?? activeTallyInput)
</script>

<div class="md:max-w-sm w-full flex flex-col mx-auto lg:ml-0 gap-0.5 overflow-y-auto max-h-screen scrollbar-thin">
	{#if (!passedInActiveTally)}
		<ButtonGroup options={tallyOptions} selectedOption={activeTally} label="required"  />
		{/if}
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
						{#if activeTally === 'buildings'}
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
									class="w-full h-full text-right top-0 dark:backdrop-brightness-75 ">{roundedbuildings}</span>
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
