<script lang="ts">

	import { DSPData } from '$lib/client/dspdata';
	import {LINKS} from '$lib'

	let { itemId } = $props<{ itemId: number }>();

	let item = DSPData.item[itemId]

</script>
<a href={LINKS.item(itemId)}>{item.Name}</a>