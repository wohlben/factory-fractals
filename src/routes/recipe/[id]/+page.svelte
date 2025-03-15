<script lang="ts">

	import {RecipePlanner} from "$lib/client/recipePlanner"
	import type { PageProps } from './$types';
	import Planner from "$lib/client/ui/components/planner.svelte"

	let { data }: PageProps = $props();

	let planner = new RecipePlanner(data.recipeId);


</script>


<Planner {planner}></Planner>



