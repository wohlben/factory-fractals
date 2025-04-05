<script lang="ts">

	import { DSPData } from '$lib/client/dspdata.js';
	import { derived } from 'svelte/store';
	import { optionalCheckboxSvelte } from '$lib/client/optional-checkbox.svelte';
	import { LINKS } from '$lib';
	import RecipeIcon from './recipe-icon.svelte';


	let { children, recipeName: passedInRecipeName } = $props<{ recipeName?: string }>();

	let item = DSPData.item;

	let selectedTypes = $state([] as string[]);

	let buildableRecipes = optionalCheckboxSvelte();
	let fluidRecipes = optionalCheckboxSvelte();
	let entityRecipes = optionalCheckboxSvelte();
	let recipeNameState = $state('');

	let recipeName = $derived(passedInRecipeName ?? recipeNameState);

	let moreFilter = $state(false);


	let matchingItems = $derived(!recipeName ? [] : DSPData.items.filter(i => i.Name.toLowerCase().includes(recipeName?.toLowerCase())).map(i => i.ID));
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

<div
	class="flex gap-0.5 flex-col mb-4 sticky top-0 mr-2 backdrop-blur bg-gray-50/70  dark:bg-gray-950/70 lg:dark:bg-transparent lg:bg-transparent ">
	{#if (moreFilter)}
		<div class="flex w-full gap-2">
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
	{#if children}
		{children()}
	{:else}
		{#if (passedInRecipeName !== undefined)}
		{:else}
			<label for="recipeName" class="py-2 text-center">ingredient or recipe name</label>
			<input id=recipeName
						bind:value={recipeNameState} />
		{/if}
	{/if}
</div>

{#each availableRecipes as recipe}
	<div class="flex flex-col items-stretch group w-full ">
		<a class="  dark:hover:bg-slate-700 hover:bg-slate-300  md:px-4 md:py-2 w-full flex gap-2" href={LINKS.recipe(recipe.ID)}>
			<span class="w-8"><RecipeIcon recipeId={recipe.ID} /></span><span class="flex-grow">{ recipe.Name }</span></a>
	</div>
{/each}
