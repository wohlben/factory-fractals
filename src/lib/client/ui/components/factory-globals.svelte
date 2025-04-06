<script lang="ts">
	import { FactoryGlobals } from '$lib/client/factory-globals';
	import ItemIcon from './item-icon.svelte';
	import RecipeIcon from './recipe-icon.svelte';
	import { DSPData } from '$lib/client/dspdata';

	let defaultTierReadable = FactoryGlobals.defaultTier;
	let defaultRecipes = FactoryGlobals.defaultRecipes;
	let defaultDepth = FactoryGlobals.defaultDepth;

	let defaultTiersOpen = $state(true);

	let defaultRecipeOpen = $state(true);

	const updateDefault = (key: string, val: number) => {
		const newTier = { ...$defaultTierReadable, [key]: val };
		localStorage.setItem(`defaultTiers`, JSON.stringify(newTier));
		FactoryGlobals.defaultTier.set(newTier);
	};

	const updateDefaultRecipe = (itemId: number, recipeId: number | null) => {
		const newRecipes = { ...$defaultRecipes, [itemId]: recipeId };
		localStorage.setItem(`defaultRecipes`, JSON.stringify(newRecipes));
		FactoryGlobals.defaultRecipes.set(newRecipes);
	};

	const updateDefaultDepth = (depthInput: string) => {
		const depth = parseInt(depthInput, 10);
		if (isNaN(depth)) return;
		localStorage.setItem(`defaultDepth`, JSON.stringify({ depth }));
		FactoryGlobals.defaultDepth.set(depth);
	};
</script>


<div>
	<h4 class="dark:bg-blue-900 bg-blue-300 py-2 px-4 rounded-t">depth to automatically plan on recipe selection</h4>
	<div class="flex dark:bg-gray-600 bg-slate-100">
		<input type="number" value={$defaultDepth} onchange={val => updateDefaultDepth(val.target?.value)} />
	</div>
</div>


<div class="group">
	<button onclick={() => defaultTiersOpen = !defaultTiersOpen}
					class="dark:bg-blue-800 dark:group-hover:bg-blue-700 bg-blue-300 group-hover:bg-blue-400 hover:shadow-2xl w-full rounded-t py-5 px-4 flex"
					class:bg-blue-300={!defaultTiersOpen} class:bg-blue-400={defaultTiersOpen}>default tier for
		new factories
		<span class="ml-auto shadow-2xl">	{#if defaultTiersOpen}🔼{:else}🔽{/if}
</span>
	</button>
	<div
		class="pl-6 pb-4 flex gap-2 flex-col dark:bg-blue-800 dark:group-hover:bg-blue-700 bg-blue-300 group-hover:bg-blue-400">
		{#if defaultTiersOpen}
			{#each Object.keys($defaultTierReadable) as recipeType}
				{#if (FactoryGlobals.availableTiers[recipeType]?.length > 1)}
					<div>
						<h4 class="dark:bg-blue-900 bg-blue-300 py-2 px-4 ">{recipeType}</h4>
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

	</div>
</div>

<div class="group">

	<button onclick={() => defaultRecipeOpen = !defaultRecipeOpen}
					class="dark:bg-blue-800 dark:group-hover:bg-blue-700 bg-blue-300 group-hover:bg-blue-400 hover:shadow-2xl  rounded-t py-5 px-4 flex w-full"
					class:bg-blue-300={!defaultRecipeOpen} class:bg-blue-400={defaultRecipeOpen}>default recipe to procure item
		<span class="ml-auto shadow-2xl ">	{#if defaultRecipeOpen}🔼{:else}🔽{/if}
</span>

	</button>

	<div
		class="pl-6 pb-4 flex gap-2 flex-col dark:bg-blue-800 dark:group-hover:bg-blue-700 bg-blue-300 group-hover:bg-blue-400">

		{#if (defaultRecipeOpen)}
			{#snippet theButton(active, clickHandler, children)}
				<button
					class="w-full shadow-xl py-2 m-4 flex items-center justify-center gap-2  rounded-lg flex-wrap"
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
					onclick={clickHandler}>
					{@render children()}
				</button>

			{/snippet}

			{#snippet recipeSelection(active, itemId, recipeId)}
				{@const recipe = DSPData.recipe[recipeId]}

				{#snippet recipePreview(itemCounts, itemId)}
					{@const item = DSPData.item[itemId]}
					<span class="flex gap-1">
							<span>{itemCounts}</span>
						<ItemIcon itemId={itemId} />
				 <span>{item.Name}</span>
						</span>
				{/snippet}

				{#snippet children()}
					{@const defaultTierOfType =$defaultTierReadable[recipe.Type] }
					{@const factoryItem = FactoryGlobals.factoryItems[recipe.Type][defaultTierOfType]}

					<RecipeIcon recipeId={recipeId} />
					<span>{recipe.Name}</span>
					<span class="px-2">⌚ {recipe.TimeSpend / 60}s</span>

					<span class="flex w-full justify-center gap-2">
							<span class="w-10 "><ItemIcon itemId={factoryItem} small={false} /></span>

				<span class="flex flex-grow justify-center gap-2">
									<span>
					{#each recipe.Items as inputItemId, index}
						{@render recipePreview(recipe.ItemCounts[index], inputItemId)}
						{/each}
				</span>
				<span>➡️</span>

				<span>
										{#each recipe.Results as outputItemId, index}
																	{@render recipePreview(recipe.ResultCounts[index], outputItemId)}

						{/each}
				</span>

				</span>
			</span>
				{/snippet}

				{@render theButton(active, () => updateDefaultRecipe(itemId, recipeId), children)}

			{/snippet}

			{#each Object.entries(DSPData.alternativeRecipe) as [itemIdS, recipes]}
				{@const itemId = Number(itemIdS)}
				{#if (recipes.length > 1 || recipes.length === 1 && (DSPData.canBeExtracted[itemId] || DSPData.canBeMined[itemId]))}
					<div>
						<h4 class="dark:bg-blue-900 bg-blue-300 py-2 px-4 rounded-t flex gap-2 justify-center">
							<ItemIcon itemId={itemId} />
							{DSPData.item[itemId].Name}
						</h4>
						<div class="flex dark:bg-gray-600 bg-slate-100  flex-wrap">
							{#if DSPData.canBeMined[itemId]}
								{@const active = null === $defaultRecipes[itemId]}

								{#snippet children()}
									<span class="w-10  "><ItemIcon itemId={2316} small={false} /></span>
									<span class="flex-grow">Mining</span>
									<span class="w-10  "><ItemIcon itemId={2301} small={false} /></span>
								{/snippet}

								{@render theButton(
									active,
									() => updateDefaultRecipe(itemId, null,), children,
								)}


							{/if}
							{#if DSPData.canBeExtracted[itemId]}
								{@const active = null === $defaultRecipes[itemId]}

								{#snippet children()}
									<span class="w-10  "><ItemIcon itemId={2105} small={false} /></span>
									<span class="flex-grow">							Extraction</span>
									<span class="w-10  "><ItemIcon itemId={2306} small={false} /></span>

								{/snippet}

								{@render theButton(
									active,
									() => updateDefaultRecipe(itemId, null,), children,
								)}


							{/if}


							{#each recipes as recipeId, index}
								{@const active = recipeId === $defaultRecipes[itemId]}
								{@render recipeSelection(active, itemId, recipeId)}
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

