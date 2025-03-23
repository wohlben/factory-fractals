<script lang="ts">
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import ItemIcon from './item-icon.svelte';

	let defaultTierReadable = FactoryGlobals.defaultTier;
	let defaultTier = $defaultTierReadable;

	let defaultTiersOpen = $state(false);

	const updateDefault = (key: string, val: number) => {
		const newTier = { ...$defaultTierReadable, [key]: val };
		localStorage.setItem(`defaultTiers`, JSON.stringify(newTier));
		FactoryGlobals.defaultTier.set(newTier);
	};
</script>

<button onclick={() => defaultTiersOpen = !defaultTiersOpen} class="bg-blue-800 hover:bg-blue-700 hover:shadow-2xl  rounded-t py-5 px-4 flex">default tier for
	new factories
	<span class="ml-auto shadow-2xl">	{#if defaultTiersOpen}🔼{:else}🔽{/if}
</span>

</button>

{#if defaultTiersOpen}
	<div></div>
	{#each Object.keys($defaultTierReadable) as recipeType}
		{#if (FactoryGlobals.availableTiers[recipeType]?.length > 1)}
			<div>
				<h4 class="bg-blue-900 py-2 px-4 rounded-t">{recipeType}</h4>
				<div class="flex bg-gray-600 ">
					{#each FactoryGlobals.availableTiers[recipeType] as tier}
						{@const itemId = FactoryGlobals.factoryItems[recipeType][tier]}
						{@const active = tier === $defaultTierReadable[recipeType]}
						<button
							class="flex-grow shadow-xl py-2 m-4 flex items-center justify-center gap-2      rounded-lg"
							class:outline-amber-100={active}
							class:outline-1={active}
							class:active={active}
							class:bg-slate-500={active}
							class:hover:bg-slate-400={active}
							class:text-white={active}
							class:hover:bg-slate-700={!active}
							class:text-gray-300={!active}
							class:bg-slate-800={!active}
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

