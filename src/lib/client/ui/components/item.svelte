<script lang="ts">

	import { DSPData } from '$lib/client/dspdata';

	let { itemId } = $props<{ itemId: number }>();

	let item = DSPData.item[itemId]

</script>
<span>{item.Name}</span>