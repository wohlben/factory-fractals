<script lang="ts">
	import { type RecipePlanner } from '$lib/client/recipePlanner';
	import { FactoryGlobals } from '$lib/client/factory-globals';

	let { planner } = $props<{ planner: RecipePlanner }>();
	let { targetInterval, timeSpend, timeSpendChanged } = $derived(planner);
	let { defaultInterval } = FactoryGlobals;


	let intervalPicker = $state(false);
	const ONE_MINUTE = 60 * 60;

	const switchInterval = (interval: number | null) => {
		planner.setInterval(interval);
		intervalPicker = false;
		defaultInterval.set(interval);
		localStorage?.setItem('defaultInterval',
			JSON.stringify({ interval })
		);
	};

</script>
{#if (intervalPicker)}
				<span class="inline-flex">
						<button class="px-1.5 py-2 multi hover:bg-slate-700" class:animate-flash={$timeSpendChanged}
										class:active={$targetInterval === 0}
										onclick={() => switchInterval(null)}>
							Cycle ({ Math.round($timeSpend / 60 * 100) / 100 }s)
						</button>

		      <button class="px-1.5 py-2 multi hover:bg-slate-700" class:active={$targetInterval === ONE_MINUTE}
									onclick={() => switchInterval(ONE_MINUTE)}>Minute</button>
				    	<button class="px-1.5 py-2 multi hover:bg-slate-700" class:active={$targetInterval === 60}

											onclick={() => switchInterval(60)}>Second</button>
				</span>
{:else}
<span class="px-3 py-1 dark:bg-slate-800 bg-slate-200 rounded-r-lg">Items per
			<span class="inline-flex">

				<!-- mobile -->
						<button class="px-1.5 py-2 multi hover:bg-slate-700 xl:hidden" class:animate-flash={$timeSpendChanged}
										class:active={$targetInterval === null}
										class:hidden={$targetInterval !== null}
										onclick={() => intervalPicker = true}>
							Cycle ({ Math.round($timeSpend / 60 * 100) / 100 }s)
						</button>

		      <button class="px-1.5 py-2 multi hover:bg-slate-700 xl:hidden"
									class:active={$targetInterval === ONE_MINUTE}
									class:hidden={$targetInterval !== ONE_MINUTE}
									onclick={() => intervalPicker = true}>Minute</button>

					<button class="px-1.5 py-2 multi hover:bg-slate-700 xl:hidden"
									class:active={$targetInterval === 60}
									class:hidden={$targetInterval !== 60}
									onclick={() => intervalPicker = true}>Second</button>

				<!-- desktop -->

				<span class="inline-flex">
						<button class="px-1.5 py-2 multi hover:bg-slate-700 hidden xl:inline"
										class:animate-flash={$timeSpendChanged && $targetInterval === 0 }
										class:active={$targetInterval === null}
										onclick={() => switchInterval(null)}>
							Cycle ({ Math.round($timeSpend / 60 * 100) / 100 }s)
						</button>

		      <button class="px-1.5 py-2 multi hover:bg-slate-700 hidden xl:inline"
									class:active={$targetInterval === ONE_MINUTE}
									onclick={() => switchInterval(ONE_MINUTE)}>Minute</button>

					<button class="px-1.5 py-2 multi hover:bg-slate-700 hidden xl:inline"
									class:active={$targetInterval === 60}
									onclick={() => switchInterval(60)}>Second</button>
			</span>

			</span>
		</span>
{/if}