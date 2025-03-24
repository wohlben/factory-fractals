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

	let conveyorIcons = $derived(requiredConveyor(outputs));

</script>

{#each conveyorIcons as icons}
	{#if icons[1] > 0}
		<div class="flex gap-1 relative justify-center">
				<ItemIcon itemId={icons[0]} />
			<span class="absolute  mx-auto text-center top-0 px-1    rounded-3xl bg-white/70 dark:bg-black/30  ">{icons[1]}</span>

		</div>
	{/if}
{/each}
