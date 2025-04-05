<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		onNavigate,
	} from '$app/navigation';
	let { children, close, header } = $props<{ close?: () => void, header?: Snippet }>();
	onNavigate(() => close?.())
</script>

<button onclick={() => close?.()}
				class="fixed overscroll-contain w-screen h-screen backdrop-blur-2xl dark:bg-black opacity-70 top-0 left-0 z-10"
				aria-label="close">
</button>

<dialog open
				class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-50 dark:bg-gray-950  dark:text-amber-50 fixed outline-1 rounded-2xl outline-slate-600 overflow-y-scroll z-10 flex flex-col  gap-2 scroll-mt-20">
	{#if header || close}
		<h6 class="flex items-center justify-between sticky top-0  bg-gray-50/70 dark:bg-gray-950/70">{@render header?.()}
			{#if close}
				<button onclick={() => close?.()}
								class="dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-200 hover:bg-slate-300 w-12 py-2 absolute right-0 top-0 h-full">✖️
				</button>
			{/if}
		</h6>
	{/if}

	{@render children()}
</dialog>
