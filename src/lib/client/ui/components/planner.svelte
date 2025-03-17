<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import Planner from './planner.svelte';
	import Item from './item.svelte';
	import TierPicker from './tier-picker.svelte';
	import { DSPData } from '$lib/client/dspdata';

	let { planner, deletecb } = $props<{ planner: RecipePlanner, deletecb?: () => void }>();

	let {
		item,
		itemId,
		recipe,
		recipeId,
		targetInterval,
		requiredBuildings,
		children,
		childrenByItemId,
		targetAmount,
		childrenProvideItemsPerInterval,
		providedItemsPerInterval,
		requiredItemsPerInterval,
		inputsOutputs,
		deficit,
		options,
		tier
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
</script>
<div class="flex gap-1 max-w-2xl items-center">
	<div class="bg-slate-800  text-center rounded-r-lg  ">
		{#if planner.amountEditable }
			<input type="number" class="text-left rounded-r-lg w-16" bind:value={amount}>
		{:else }

			<button class="flex items-center" onclick={() => deletecb()}>
				<span class="pl-2">🗑</span>️
				<span class="text-sm py-2 block pr-4" style="padding-left: {(planner.depth * 1.5) }rem">
					{Math.round($targetAmount * 100) / 100}
				</span>
			</button>
		{/if}
	</div>

	<div class="flex-grow px-4"><h5>
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
	{#if $requiredBuildings && $recipeId}
		<TierPicker planner={planner}></TierPicker>
	{/if}
</div>

{#if ($inputsOutputs?.size > 0)}
	<div class="flex flex-col gap-0.5">
		{#each $inputsOutputs as mi}
			{@const difference = ($providedItemsPerInterval?.[mi] ?? 0) + ($childrenProvideItemsPerInterval?.[mi] ?? 0) - ($requiredItemsPerInterval?.[mi] ?? 0) }
			{@const child = $childrenByItemId[mi] }
			{#key mi}
				{#if child}
					<Planner planner={child} deletecb={() => planner.deleteChild(mi)}></Planner>
				{:else}
					<div class="flex gap-2">
						<div class="bg-slate-800  text-center rounded-r-lg ">
							{#if (difference < 0 && DSPData.producedVia[mi]?.length > 0)}
								<button class="flex items-center" onclick={() => planner.planFor(mi)}>
									<span class="pl-2">📝</span>️
									<span class="text-sm py-2 block pr-4" style="padding-left: {((planner.depth + 1) * 1.5) }rem">
				{Math.round(difference * 100) / 100}</span>
								</button>
							{:else if (mi !== $itemId && difference !== 0)}
								<div class="flex items-center">
									<span class="pl-4"></span>️
									<span class="text-sm py-2 block pr-4" style="padding-left: {((planner.depth + 1) * 1.5) }rem">
				{Math.round(difference * 100) / 100}</span>
								</div>
							{/if}
						</div>


						{#if (mi !== $itemId && difference !== 0)}
							<div class="flex gap-2 items-center" class:text-green-500={(difference > 0)}
									 class:text-red-500={difference < 0}>
								<Item itemId={mi} />
							</div>
						{/if}
					</div>
				{/if}
			{/key}
		{/each}
	</div>
{/if}
