<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import Planner from './planner.svelte';
	import Item from './item.svelte';
	import { DSPData } from '$lib/client/dspdata';

	let { planner } = $props<{ planner: RecipePlanner }>();

	let {
		item,
		itemId,
		recipe,
		recipeId,
		targetInterval,
		requiredBuildings,
		children,
		targetAmount,
		childrenProvideItemsPerInterval,
		providedItemsPerInterval,
		requiredItemsPerInterval,
		inputsOutputs,
		deficit,
		options
	} = planner;


	let amount = $state($targetAmount);
	let selectedRecipe = $state($recipeId);


	$effect(() => {
		if (planner.amountEditable && $targetAmount !== amount)
			planner.setAmount(amount);
	});
	$effect(() => {
		if (selectedRecipe !== $recipeId) {
			planner.setRecipeId(selectedRecipe);
		}
	});
	$effect(() => {
		console.log($recipeId);
	});
</script>

<div class="flex gap-2 max-w-2xl">
	<div>
		{#if planner.amountEditable }
			<input type="number" class="w-12 text-right" bind:value={amount}>
		{:else }
			<span>{$targetAmount}</span>
		{/if}
	</div>
	<div><h5>
		{#if $itemId &&
		($options.length > 1 ||
			($options.length >= 1 && DSPData.canBeExtracted[$itemId] || DSPData.canBeMined[$itemId])
		) }
			{$item.Name}:
			<select bind:value={selectedRecipe}>
				{#if DSPData.canBeExtracted[$itemId] || DSPData.canBeMined[$itemId]}
					<option value={undefined} selected={$recipeId === undefined}>extraction/mining</option>
				{/if}

				{#each $options as option}
					<option value={DSPData.recipe[option].ID}
									selected={recipeId === DSPData.recipe[option].ID}>{DSPData.recipe[option].Name}</option>
				{/each}
			</select>
		{:else}
			{ $recipe?.Name }
		{/if}
	</h5>

	</div>
	<span>in { $targetInterval / 60 }s</span>
	{#if $requiredBuildings && $recipeId}
		<span class="flex-grow text-right w-12"> { Math.round($requiredBuildings * 100) / 100 }</span>
	{/if}
</div>

<div class="ml-4">

	<div class="ml-4">

		{#each $children as planner}
			<Planner {planner}></Planner>
		{/each}

	</div>
</div>

<div class="ml-4">

	<ul class="ml-4">

		{#each $inputsOutputs as mi}
			{@const difference = ($providedItemsPerInterval?.[mi] ?? 0) + ($childrenProvideItemsPerInterval?.[mi] ?? 0) - ($requiredItemsPerInterval?.[mi] ?? 0)}

			{#if (mi !== $itemId && difference !== 0)}
				<li class:text-green-500={(difference > 0)}
						class:text-red-500={difference < 0}>
					{difference} <Item itemId={mi} /> / {$targetInterval / 60}s
				</li>
			{/if}
		{/each}
		{#if (Object.keys($deficit).length > 0)}
			<button onclick={() => planner.expand()}> DRILL BABY DRILL</button>
		{/if}
	</ul>

</div>
