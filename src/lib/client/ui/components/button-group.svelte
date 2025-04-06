<script lang="ts">

	let { label, selectedOption, options } = $props<{
		label: string,
		selectedOption: any,
		options: { label: string, select: () => void, elem?: any }[]
	}>();
</script>

<h4 class="py-2 dark:bg-slate-800 bg-slate-200 rounded-t-lg flex gap-2 justify-center  w-full items-center sticky top-0">
	<span>{label}</span>
	<span>
		{#each options as option}
			<button class="px-4 py-2 first:rounded-l-lg last:rounded-r-lg  outline-gray-600 "
							class:bg-blue-300={selectedOption === (option.elem ?? option.label) }
							class:bg-gray-300={selectedOption !== (option.elem ?? option.label)}
							class:hover:bg-blue-500={selectedOption === (option.elem ?? option.label)}
							class:hover:bg-gray-500={selectedOption !== (option.elem ?? option.label)}
							class:dark:bg-blue-700={selectedOption === (option.elem ?? option.label)}
							class:dark:bg-gray-700={selectedOption !== (option.elem ?? option.label)}

							onclick={() => option.select() }> {option.label}
			</button>
		{/each}
	</span>

</h4>
