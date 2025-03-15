<script lang="ts">
	let { TimeSpend: TimeSpend } = $props<{ TimeSpend: number}>();
	const ONE_MINUTE = 60 * 60; // a second is 60 for some reason
</script>
<div class="flex items-center">
	<div class="px-3 py-0.5 bg-gray-700 rounded-l-md ">
		{ TimeSpend / 60 }s
	</div>
	<span class="px-3 py-0.5 bg-slate-600">cycle</span>
	<div class="px-3 py-0.5 bg-gray-700 rounded-r-md ">
		<span class="text-xs">{ONE_MINUTE / TimeSpend}/min</span>
	</div>
</div>