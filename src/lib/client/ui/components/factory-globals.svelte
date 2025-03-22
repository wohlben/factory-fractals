<script lang="ts">
	import { FactoryGlobals } from '$lib/client/factory-globals';

	let defaultTierReadable = FactoryGlobals.defaultTier;
	let defaultTier = $defaultTierReadable;


	const updateDefault = (key: string, val: number) => {
		const newTier = { ...$defaultTierReadable, [key]: val };
		localStorage.setItem(`defaultTiers`, JSON.stringify(newTier));
		FactoryGlobals.defaultTier.set(newTier);
	};
</script>

<h3 class="bg-blue-800  rounded-t py-5 px-4">default tier for new factories</h3>

{#each Object.keys($defaultTierReadable) as recipeType}
	{#if (FactoryGlobals.availableTiers[recipeType]?.length > 1)}
		<div>
			<h4 class="bg-blue-900 py-2 px-4 rounded-t">{recipeType}</h4>
			<div class="flex bg-gray-600 ">
				{#each FactoryGlobals.availableTiers[recipeType] as tier}
					{#if (tier === $defaultTierReadable[recipeType])}
						<button
							class="flex-grow shadow-xl py-2 m-4 outline-amber-100 outline-1 active bg-slate-500 hover:bg-slate-400  text-white rounded-lg"
							onclick={() => updateDefault(recipeType, tier)}>{tier}
						</button>
					{:else}
						<button
							class="flex-grow shadow-xl py-2 m-4	bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg"
							onclick={() => updateDefault(recipeType, tier)}>{tier}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
{/each}

