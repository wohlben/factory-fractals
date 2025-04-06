<script lang="ts">
	import type { Writable } from 'svelte/store';

	let { label, selectedOption, options } = $props<{ label: string, selectedOption: Writable<any>, options: string[] }>();
</script>

<h4 class="px-4 py-2 dark:bg-slate-800 bg-slate-200 rounded-t-lg flex items-center sticky top-0 z-10">
	<span class="flex-grow">{label}</span>
	{#each options as option}
		<button class=" px-4 py-2 rounded-l-lg  outline-gray-600 "
						class:bg-blue-300={selectedOption === option}
						class:bg-gray-300={selectedOption !== option}
						class:hover:bg-blue-500={selectedOption === option}
						class:hover:bg-gray-500={selectedOption !== option}
						class:dark:bg-blue-700={selectedOption === option}
						class:dark:bg-gray-700={selectedOption !== option}

						onclick={() => selectedOption = option }> buildings
		</button>
	{/each}
</h4>
