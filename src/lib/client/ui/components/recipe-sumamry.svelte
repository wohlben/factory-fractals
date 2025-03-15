<script lang="ts">
	import { DSPData, type RecipeeType } from '$lib/client/dspdata';
	import Item from './item.svelte';

	let { recipeId, multiplier } = $props<{ recipeId: number, multiplier?: number }>();

	let recipe: RecipeeType = DSPData.recipe[recipeId];
	const MINUTE = 60 * 60; // 60 seconds * 60 ... ticks?

	let intervalsPerMinute = MINUTE / (recipe?.TimeSpend ?? 60);

</script>

<div class="max-w-sm flex-col bg-gray-500 bg-opacity-100 opacity-100 z-40 pointer-events-none p-4">

	<h6> every {recipe.TimeSpend / 60}s:</h6>

	<div class="flex gap-2 ml-4">
		<div class="flex flex-col">
			{#each recipe?.Items as input, index}
				<span><Item itemId={input} /> {recipe.ItemCounts[index]}</span>
			{/each}
		</div>
		=>
		<div class="flex flex-col">
			{#each recipe?.Results as result, index}
				<span><Item itemId={result} /> {recipe.ResultCounts[index]}</span>
			{/each}
		</div>
	</div>

	<h6>every minute</h6>

	<div class="flex gap-2 ml-4">
		<div class="flex flex-col">
			{#each recipe?.Items as input, index}
				<span><Item itemId={input} /> {recipe.ItemCounts[index] * intervalsPerMinute}</span>
			{/each}
		</div>
		=>
		<div class="flex flex-col">
			{#each recipe?.Results as result, index}
				<span><Item itemId={result} /> {recipe.ResultCounts[index] * intervalsPerMinute}</span>
			{/each}
		</div>
	</div>

	{#if multiplier}
		<h6> actually every {recipe.TimeSpend / 60}s:</h6>

		<div class="flex gap-2 ml-4">
			<div class="flex flex-col">
				{#each recipe?.Items as input, index}
					<span>{recipe.ItemCounts[index] * multiplier} <Item itemId={input} /></span>
				{/each}
			</div>
			=>
			<div class="flex flex-col">
				{#each recipe?.Results as result, index}
					<span>{recipe.ResultCounts[index] * multiplier} <Item itemId={result} /> </span>
				{/each}
			</div>
		</div>

		<h6>actually every minute</h6>

		<div class="flex gap-2 ml-4">
			<div class="flex flex-col">
				{#each recipe?.Items as input, index}
					<span>{recipe.ItemCounts[index] * intervalsPerMinute * multiplier} <Item itemId={input} /></span>
				{/each}
			</div>
			=>
			<div class="flex flex-col">
				{#each recipe?.Results as result, index}
					<span>{recipe.ResultCounts[index] * intervalsPerMinute * multiplier} <Item itemId={result} /> </span>
				{/each}
			</div>
		</div>
		{/if}

</div>