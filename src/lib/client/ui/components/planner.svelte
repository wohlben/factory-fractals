<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import Planner from './planner.svelte';
	import Item from './item.svelte';
	import TierPicker from './tier-picker.svelte';
	import PlannerDetail from './planner-details.svelte';
	import { DSPData } from '$lib/client/dspdata';
	import { LINKS } from '$lib';

	let { planner, deletecb } = $props<{ planner: RecipePlanner, deletecb?: () => void }>();

	let {
		item,
		itemId,
		recipe,
		recipeId,
		targetInterval,
		relativeSpeed,
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

	let detailDialog = $state(false);

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

{#if (detailDialog)}
	<dialog  open
					 class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2 fixed ">

		<PlannerDetail planner={planner}></PlannerDetail>
		<button class="bg-green-800 hover:bg-green-700 py-2 rounded-xl mt-auto" onclick={() => detailDialog = false}>close</button>
	</dialog>

	<button onclick={() => detailDialog = false} class="fixed overscroll-contain w-screen h-screen backdrop-blur-2xl bg-black opacity-70 top-0 left-0 z-40" aria-label="close">
	</button>

{/if}

<div class="flex gap-1 max-w-2xl items-center hover:bg-gray-700">
	<button onclick={() => deletecb()} class="bg-slate-800 hover:bg-red-700  text-center rounded-r-lg  ">
		{#if planner.amountEditable }
			<style scoped>
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
              /* display: none; <- Crashes Chrome on hover */
              -webkit-appearance: none;
              margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
          }

          input[type=number] {
              -moz-appearance: textfield;
          }
			</style>
			<input type="number" class="text-left rounded-r-lg w-16" bind:value={amount}>
		{:else }

			<div class="flex items-center">
				<span class="pl-2">🗑️</span>️
				<span class="text-sm py-2 block pr-4" style="padding-left: {(planner.depth) * 1.1 }rem">
					{Math.round($targetAmount * 100) / 100}
				</span>
			</div>
		{/if}
	</button>

	<div class="flex-grow px-4"><h5 class="flex">
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
			<span class="flex-grow">{ $recipe?.Name } <a class="bg-gray-800 hover:bg-slate-700" href={LINKS.recipe($recipe.ID) + "?targetAmount=" + Math.round($requiredBuildings) + "&depth=" + 10}>➡️</a></span>
			{#if $children.length > 1 && !planner.amountEditable}
				<button class="py-1 rounded-xl px-4 bg-slate-800 hover:bg-slate-700" onclick={() => detailDialog = true}>🔎</button>
			{/if}
		{/if}
	</h5>

	</div>
	{#if $requiredBuildings && $recipeId}
		<TierPicker planner={planner}></TierPicker>
	{/if}
</div>

{#if ($inputsOutputs?.size > 0)}
	<div class="flex flex-col gap-0.5 ">
		{#each $inputsOutputs as mi}
			{@const difference = ($providedItemsPerInterval?.[mi] ?? 0) + ($childrenProvideItemsPerInterval?.[mi] ?? 0) - ($requiredItemsPerInterval?.[mi] ?? 0) }
			{@const child = $childrenByItemId[mi] }
			{#key mi}
				{#if child}
					<Planner planner={child} deletecb={() => planner.deleteChild(mi)}></Planner>
				{:else}
					<div class="flex gap-2 hover:bg-gray-700">
						<button class="bg-slate-800  text-center rounded-r-lg"
										class:hover:bg-green-800={difference < 0 && DSPData.producedVia[mi]?.length > 0}
										onclick={() => difference < 0 && DSPData.producedVia[mi]?.length > 0 && planner.planFor(mi)}>
							{#if (difference < 0 && DSPData.producedVia[mi]?.length > 0)}
								<div class="flex items-center">
									<span class="pl-2">📝</span>️
									<span class="text-sm py-2 block pr-4" style="padding-left: {((planner.depth + 0.5) * 1.1) }rem">
				{Math.round(difference * 100) / 100}</span>
								</div>
							{:else if (mi !== $itemId && difference !== 0)}
								<div class="flex items-center">
									<span class="px-3.5"></span>️
									<span class="text-sm py-2 block pr-4" style="padding-left: {((planner.depth + 0.5) * 1.1) }rem">
				{Math.round(difference * 100) / 100}</span>
								</div>
							{/if}
						</button>


						{#if (mi !== $itemId && difference !== 0)}
							<div class="flex gap-2 items-center " class:text-green-500={(difference > 0)}
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
