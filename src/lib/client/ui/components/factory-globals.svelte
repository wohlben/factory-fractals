<script lang="ts">
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import type { Writable } from 'svelte/store';

	let {
		Smelt,
		Assemble,
		Research,
		Chemical,
		Refine,
		Particle,
		Fractionate,
		Proliferator
	} = FactoryGlobals.defaultTier;


	const updateDefault = (key: string, val: number, wabl: Writable<number>) => {
		localStorage.setItem(`dt.${key}`, val);
		wabl.set(val);
	};
</script>

<h3 class="bg-blue-800  rounded-t py-5 px-4">default tier for new factory of type</h3>

<div>
	<h4 class="bg-blue-900 py-2 px-4 rounded-t">Smelting</h4>
	<div class="flex bg-gray-600 ">
		{#each FactoryGlobals.availableTiers['Smelt'] as tier}
			{#if (tier === $Smelt)}
				<button
					class="flex-grow shadow-xl py-2 m-4 outline-amber-100 outline-1 active bg-slate-500  text-white rounded-lg"
					onclick={() => updateDefault('Smelt', tier, Smelt)}>{tier}
				</button>
			{:else}
				<button
					class="flex-grow shadow-xl py-2 m-4	bg-slate-800 text-gray-300 rounded-lg"
					onclick={() => updateDefault('Smelt', tier, Smelt)}>{tier}
				</button>
			{/if}
		{/each}
	</div>
</div>

<div>
	<h4 class="bg-blue-900 py-2 px-4 rounded-t">Assembler</h4>
	<div class="flex bg-gray-600 ">
		{#each FactoryGlobals.availableTiers['Assemble'] as tier}
			{#if (tier === $Assemble)}
				<button
					class="flex-grow shadow-xl py-2 m-4 outline-amber-100 outline-1 active rounded-lg bg-slate-500  text-white"
					onclick={() => updateDefault('Assemble', tier, Assemble)}>{tier}
				</button>
			{:else}
				<button
					class="flex-grow shadow-xl py-2 m-4 bg-slate-800 text-gray-300 rounded-lg"
					onclick={() => updateDefault('Assemble', tier, Assemble)}>{tier}
				</button>
			{/if}
		{/each}
	</div>
</div>

