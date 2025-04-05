<script lang="ts">

	import { DSPData } from '$lib/client/dspdata.js';
	import { derived } from 'svelte/store';
	import { optionalCheckboxSvelte } from '$lib/client/optional-checkbox.svelte';
	import RecipeSummary from '$lib/client/ui/components/recipe-sumamry.svelte';
	import { LINKS } from '$lib';


	let item = DSPData.item;

	let selectedTypes = $state([] as string[]);

	let buildableRecipes = optionalCheckboxSvelte();
	let fluidRecipes = optionalCheckboxSvelte();
	let entityRecipes = optionalCheckboxSvelte();

	let recipeName = $state('');


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
	const ONE_MINUTE = 60 * 60; // a second is 60 for some reason
</script>


<div class="flex w-full gap-2 ">

	<select bind:value={selectedTypes} multiple>
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

	<input bind:value={recipeName} />
</div>

{#each availableRecipes as recipe}
	<div class="w-1/2 flex flex-col items-stretch group">
		<div class="my-2 z-30"><a class="w-xs" href={LINKS.recipe(recipe.ID)}>{ recipe.Name }</a></div>

		<div class="group-hover:block hidden h-0 overflow-visible z-20">
			<RecipeSummary recipeId={recipe.ID}>
			</RecipeSummary>
		</div>

	</div>


{/each}