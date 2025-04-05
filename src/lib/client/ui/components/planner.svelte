<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import Planner from './planner.svelte';
	import Item from './item.svelte';
	import TierPicker from './tier-picker.svelte';
	import PlannerDetail from './planner-details.svelte';
	import ItemIcon from './item-icon.svelte';
	import Dialog from './dialog.svelte';
	import { DSPData } from '$lib/client/dspdata';
	import { LINKS } from '$lib';
	import PlannerItemPill from './planner-item-pill.svelte';

	let { planner, deletecb } = $props<{ planner: RecipePlanner, deletecb?: () => void }>();

	let {
		item,
		itemId,
		recipe,
		recipeId,
		requiredBuildings,
		children,
		childrenByItemId,
		targetAmount,
		childrenProvideItemsPerInterval,
		providedItemsPerInterval,
		requiredItemsPerInterval,
		inputsOutputs,
		options,
		header
	} = planner as RecipePlanner;


	let selectedRecipe = $state($recipeId);

	let detailDialog = $state(false);

	$effect(() => {
		if (selectedRecipe !== $recipeId) {
			planner.setRecipeId(selectedRecipe);
		}
	});


	let devisorInput = $state(1);
	let devisor = $derived(!devisorInput || isNaN(devisorInput)  ?  1 : devisorInput);
	let devidedRequiredBuildings = $derived(Math.ceil($requiredBuildings / devisor))

</script>

{#if (detailDialog)}
	{#snippet header()}
		<h3 class="dark:bg-blue-800 bg-blue-300 py-2 px-4  text-center w-full">
			<input bind:value={devisorInput} class="w-24" type="number">
			<span
				class="text-xs dark:text-slate-400 text-slate-700">x</span>

			<span class="w-14 text-right">{devidedRequiredBuildings}</span>
			<span>{$recipe.Name}s</span>
		</h3>
	{/snippet}
	<Dialog close={() => detailDialog = false} header={header}>
		<PlannerDetail planner={planner} devisor={devisor}></PlannerDetail>
		<button class="dark:bg-green-800 bg-green-200 dark:hover:bg-green-700 hover:bg-green-300 py-2 rounded-xl mt-auto"
						onclick={() => detailDialog = false}>close
		</button>
	</Dialog>
{/if}

<div class="flex gap-1 max-w-2xl items-center dark:hover:bg-gray-700 hover:bg-gray-300  flex-wrap @container">


	<PlannerItemPill planner={planner} recipe={$recipe} itemId={$itemId} targetAmount={$targetAmount}
									 deletecb={deletecb} />

	<div class="flex-grow px-4 ">
		<div class="flex items-center gap-4">
			{#if $itemId &&
			($options.length > 1 ||
				($options.length >= 1 && DSPData.canBeExtracted[$itemId] || DSPData.canBeMined[$itemId])
			) }
				<select class="my-1 truncate contain-content" bind:value={selectedRecipe}>
					{#if DSPData.canBeExtracted[$itemId] || DSPData.canBeMined[$itemId]}
						<option value={undefined} selected={$recipeId === undefined}>
							{#if DSPData.canBeExtracted[$itemId]}
								orbital collector
							{:else}
								mining
							{/if}
							({$item.Name})
						</option>
					{/if}

					{#each $options as option}
						<option value={DSPData.recipe[option].ID}
										selected={$recipeId === DSPData.recipe[option].ID}>{DSPData.recipe[option].Name}</option>
					{/each}
				</select>
				{#if !planner.amountEditable && $recipe }
					<a class="dark:bg-gray-800 bg-gray-200 dark:hover:bg-slate-700 hover:bg-slate-300"
						 href={LINKS.recipe($recipe.ID) + "?targetAmount=" + Math.round($requiredBuildings) + "&depth=" + 10}>➡️</a>
				{/if}
			{:else}
			<span class="flex-grow">{ $recipe?.Name }
				{#if !planner.amountEditable }
				<a class="dark:bg-gray-800 dark:hover:bg-slate-700 bg-gray-200 hover:bg-slate-300"
					 href={LINKS.recipe($recipe.ID) + "?targetAmount=" + Math.round($requiredBuildings) + "&depth=" + 10}>➡️</a>
					{/if}
			</span>
				{#if $children.length > 1 && !planner.amountEditable}
					<button class="py-1 rounded-xl px-4 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300"
									onclick={() => detailDialog = true}>🔎
					</button>
				{/if}
			{/if}
		</div>
	</div>

	{#if $requiredBuildings && $recipeId}
		<div class="ml-auto">
			<TierPicker planner={planner}></TierPicker>
		</div>
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
					<div class="flex gap-2 dark:hover:bg-gray-700 hover:bg-gray-300">
						<button class="dark:bg-slate-800 bg-slate-200   text-center rounded-r-lg"
										disabled={ difference > 0 || !DSPData.producedVia[mi]?.length}
										class:dark:hover:bg-green-800={difference < 0 && DSPData.producedVia[mi]?.length > 0}
										class:hover:bg-green-200={difference < 0 && DSPData.producedVia[mi]?.length > 0}
										onclick={() => difference < 0 && DSPData.producedVia[mi]?.length > 0 && planner.planFor(mi)}>
							{#if (difference < 0 && DSPData.producedVia[mi]?.length > 0)}
								<div class="flex items-center">
									<span class="pl-2">📝</span>️
									<ItemIcon itemId={mi} />
									<span class="text-sm py-2 block pr-4" style="padding-left: {((planner.depth + 0.5) * 1.1) }rem">
				{Math.round(difference * 100) / 100}</span>
								</div>
							{:else if (mi !== $itemId && difference !== 0)}
								<div class="flex items-center">
									<span class="px-3.5"></span>️
									<ItemIcon itemId={mi} />
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
