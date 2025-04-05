<script lang="ts">
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import ItemIcon from './item-icon.svelte';

	let defaultTierReadable = FactoryGlobals.defaultTier;
	let defaultTier = $defaultTierReadable;

	let defaultTiersOpen = $state(true);

	const updateDefault = (key: string, val: number) => {
		const newTier = { ...$defaultTierReadable, [key]: val };
		localStorage.setItem(`defaultTiers`, JSON.stringify(newTier));
		FactoryGlobals.defaultTier.set(newTier);
	};
</script>

<button onclick={() => defaultTiersOpen = !defaultTiersOpen} class="dark:bg-blue-800 dark:hover:bg-blue-700 bg-blue-300 hover:bg-blue-400 hover:shadow-2xl  rounded-t py-5 px-4 flex" class:bg-blue-300={!defaultTiersOpen} class:bg-blue-400={defaultTiersOpen} >default tier for
	new factories
	<span class="ml-auto shadow-2xl">	{#if defaultTiersOpen}🔼{:else}🔽{/if}
</span>

</button>

{#if defaultTiersOpen}
	<div></div>
	{#each Object.keys($defaultTierReadable) as recipeType}
		{#if (FactoryGlobals.availableTiers[recipeType]?.length > 1)}
			<div>
				<h4 class="dark:bg-blue-900 bg-blue-300 py-2 px-4 rounded-t">{recipeType}</h4>
				<div class="flex dark:bg-gray-600 bg-slate-100 ">
					{#each FactoryGlobals.availableTiers[recipeType] as tier}
						{@const itemId = FactoryGlobals.factoryItems[recipeType][tier]}
						{@const active = tier === $defaultTierReadable[recipeType]}
						<button
							class="flex-grow shadow-xl py-2 m-4 flex items-center justify-center gap-2  rounded-lg"
							class:dark:outline-amber-100={active}
							class:outline-1={active}
							class:active={active}
							class:dark:bg-slate-500={active}
							class:bg-white={active}
							class:dark:hover:bg-slate-400={active}
							class:dark:text-white={active}
							class:dark:hover:bg-slate-700={!active}
							class:dark:text-gray-300={!active}
							class:dark:bg-slate-800={!active}
							class:bg-slate-200={!active}

							onclick={() => updateDefault(recipeType, tier)}>
							<ItemIcon itemId={itemId} />
							<span>{tier}</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	{/each}
{/if}

