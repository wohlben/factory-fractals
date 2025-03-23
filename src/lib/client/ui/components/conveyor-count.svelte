<script lang="ts">

	import ItemIcon from '$lib/client/ui/components/item-icon.svelte';

	let { outputs } = $props<{ outputs: number }>();

	const requiredConveyor = (outputs: number) => {
		switch (true) {
			case outputs <= 6:
				return [[2001, 1]];
			case outputs <= 12:
				return [[2002, 1]];
			case outputs <= 30:
				return [[2003, 1]];
			default:
				const stacked = Math.ceil(Math.ceil(outputs) / 30);
				const conveyors = Math.ceil(stacked / 4);
				return [[2014, conveyors > 1 ? 4 : stacked], [2003, conveyors]];
		}
	};

	let conveyorIcons = $derived(requiredConveyor(outputs))

</script>

{#each conveyorIcons as icons}
	{#if icons[1] > 0}
		<div class="flex gap-1 relative">
			<span class="absolute w-full text-center top-0 backdrop-brightness-85">{icons[1]}</span>
			<ItemIcon itemId={icons[0]} />
		</div>
	{/if}
{/each}
