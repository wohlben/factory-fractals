<script lang="ts">

	import ItemIcon from '$lib/client/ui/components/item-icon.svelte';
	import Sprite from '$lib/client/ui/components/sprite.svelte';
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import type { RecipeeType } from '$lib/client/dspdata';

	let { planner, recipe, itemId, deletecb, targetAmount } = $props<{
		planner: RecipePlanner,
		recipe: RecipeeType,
		itemId?: number,
		deletecb?: () => void,
		targetAmount: number
	}>();

	let amount = $state(targetAmount);

	$effect(() => {
		if (planner.amountEditable && targetAmount !== amount)
			planner.setAmount(amount);
	});
</script>

<button class:dark:hover:bg-red-700={!planner.amountEditable} disabled={!deletecb ||!recipe}
				onclick={() => deletecb?.()} class:hover:bg-red-300={!planner.amountEditable}
				class="dark:bg-slate-800 bg-slate-200  text-center rounded-r-lg  outline-slate-500"
				class:outline-1={planner.amountEditable}>
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
		<label class="flex items-center pl-2 gap-1">
			{#if recipe?.IconPath}
				<Sprite filename={recipe.IconPath} />
			{:else }
				<ItemIcon itemId={recipe?.Results?.[0]} />
			{/if}
			<input type="number" class="text-left rounded-r-lg w-16 outline-none" bind:value={amount}>
		</label>
	{:else }

		<div class="flex items-center">
			<span class="pl-2">🗑️</span>️
			{#if recipe?.IconPath}
				<Sprite filename={recipe.IconPath} />
			{:else}
				<ItemIcon itemId={itemId} />
			{/if}
			<span class="text-sm py-2 block pr-4" style="padding-left: {(planner.depth) * 1.1 }rem">
					{Math.round(targetAmount * 100) / 100}
				</span>
		</div>
	{/if}
</button>