<script lang="ts">
	import type { RecipePlanner } from '$lib/client/recipePlanner';
	import { DSPData } from '$lib/client/dspdata';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let { requiredBuildingsByItemId } = planner;


</script>
<div class="max-w-sm flex flex-col mr-auto gap-0.5" >
	<h4 class="px-4 py-2 bg-slate-800 rounded-t-lg">all required buildings</h4>
	{#each Object.entries($requiredBuildingsByItemId) as allRequiredBuildings}
		{@const [itemId, requiredBuildings] = allRequiredBuildings}

		<div class="flex odd:bg-gray-950 gap-2 px-2">
			<span class="flex-grow">{DSPData.item[Number(itemId)]?.Name ?? "itemId" + itemId }</span>
			<span>{requiredBuildings}</span>
		</div>
	{/each}
</div>
