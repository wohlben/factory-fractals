<script lang="ts">

	import { DSPData } from '$lib/client/dspdata.js';
	import { derived } from 'svelte/store';
	import { optionalCheckboxSvelte } from '$lib/client/optional-checkbox.svelte';
	import { LINKS } from '$lib';


	let item = DSPData.item;

	let selectedTypes = $state([] as string[]);

	let buildableRecipes = optionalCheckboxSvelte();
	let fluidRecipes = optionalCheckboxSvelte();
	let entityRecipes = optionalCheckboxSvelte();

	let recipeName = $state('');

	let moreFilter = $state(false);


	let matchingItems = $derived(!recipeName ? [] : DSPData.items.filter(i => i.Name.toLowerCase().includes(recipeName.toLowerCase())).map(i => i.ID));
	let relatedRecipes = $derived((() => {
		const demRecipees = new Set();
		matchingItems.forEach(i => {
				for (const r of DSPData.relatedRecipes[i] ?? []) {
					demRecipees.add(r);
				}
			}
		);
		return demRecipees;
	})());

	let availableRecipes = $derived(DSPData.recipees
		.filter(recipe => selectedTypes.length > 0 ? selectedTypes.includes(recipe.Type) : true)
		.filter(recipe => !recipeName ? true : relatedRecipes.has(recipe.ID))
		.filter(recipe => buildableRecipes.checked === null ? true : buildableRecipes.checked ? DSPData.buildableRecipees.has(recipe.ID) : !DSPData.buildableRecipees.has(recipe.ID))
		.filter(recipe => fluidRecipes.checked === null ? true : fluidRecipes.checked ? DSPData.fluidRecipees.has(recipe.ID) : !DSPData.fluidRecipees.has(recipe.ID))
		.filter(recipe => entityRecipes.checked === null ? true : entityRecipes.checked ? DSPData.entityRecipees.has(recipe.ID) : !DSPData.entityRecipees.has(recipe.ID))
	);
	let recipeTypes = new Set(DSPData.recipees.map(i => i.Type));
</script>

<div class="flex gap-0.5 flex-col mb-4 sticky top-0 mr-2 backdrop-blur-3xl backdrop-opacity-75  z-40">
	{#if (moreFilter)}
		<div class="flex w-full gap-2 ">
			<label for="recipeType">type</label><select id="recipeType" bind:value={selectedTypes} multiple>
			{#each recipeTypes as rt }
				<option>{rt}</option>
			{/each}
		</select>

			<div class="flex flex-col gap-4 ">
				<div class="flex gap-4 ">
					<label>buildable <input type="checkbox" bind:checked={buildableRecipes.checked}></label>
					<button class:opacity-0={!buildableRecipes.active} onclick={() => buildableRecipes.checked = null}>❌</button>
				</div>
				<div class="flex gap-4 ">
					<label>fluids <input type="checkbox" bind:checked={fluidRecipes.checked}></label>
					<button class:opacity-0={!fluidRecipes.active} onclick={() => fluidRecipes.checked = null}>❌</button>
				</div>
				<div class="flex gap-4 ">
					<label>entities <input type="checkbox" bind:checked={entityRecipes.checked}></label>
					<button class:opacity-0={!entityRecipes.active} onclick={() => entityRecipes.checked = null}>❌</button>
				</div>
			</div>
		</div>
	{/if}
	<label for="recipeName">ingredient or recipe name</label><input id=recipeName bind:value={recipeName} />
</div>

{#each availableRecipes as recipe}
	<div class="flex flex-col items-stretch group w-full ">
		<a class="my-2 z-30 dark:hover:bg-slate-700 hover:bg-slate-300 w-xs" href={LINKS.recipe(recipe.ID)}>{ recipe.Name }</a>
	</div>
{/each}
