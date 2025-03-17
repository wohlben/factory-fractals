<script lang="ts">
	import Item from '$lib/client/ui/components/item.svelte';
	import type { PageProps } from './$types';
	import { DSPData } from '$lib/client/dspdata';
	import RecipeSummary from '$lib/client/ui/components/recipe-sumamry.svelte';
	import { derived } from 'svelte/store';
	import { LINKS } from '$lib';

	let { data }: PageProps = $props<PageProps>();
	let { itemId } = $derived(data);

	let item = $derived(DSPData.item[itemId]);
</script>

<div class="py-2 px-4 max-w-xl">
	<h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Description</h6>
	<div class="py-2 px-4 bg-slate-800">
		{item.Description}
	</div>
</div>


{#if (item.Upgrades.length > 0)}
	<div class="py-2 px-4 max-w-xl">
		<h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Upgradable</h6>
		<div class="py-2 px-4 bg-slate-800">

			{#each item.Upgrades as upgrade}
				<div class="group">
					<div class="z-10">
						{#if (itemId === upgrade)} ➡{:else}<span class="w-6 inline-block"></span>    {/if}
						<Item itemId={upgrade} />
						{#if (itemId === upgrade)} 👈{/if}

					</div>
					<div class="group-hover:block hidden h-0 overflow-visible z-40">
						<RecipeSummary recipeId={DSPData.producedVia[upgrade][0].ID} />
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="py-2 px-4 max-w-xl">
		<h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Name</h6>
		<div class="py-2 px-4 bg-slate-800">
			{item.Name}
		</div>
	</div>
{/if}

{#if (DSPData.relatedRecipes[itemId]?.size > 0)}
	<div class="py-2 px-4 max-w-xl">
		<h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Related Recipes</h6>
		<div class="py-2 px-4 bg-slate-800 flex flex-col gap-1">
			{#each DSPData.relatedRecipes[itemId] as recipeId}
				<a href={LINKS.recipe(recipeId)}>{DSPData.recipe[recipeId].Name}</a>
			{/each}
		</div>
	</div>
{/if}
