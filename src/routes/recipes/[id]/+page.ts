import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	console.log(params)
	const {id} = params;
	const recipeId = Number(id);
	console.log(recipeId)
	return {recipeId};
};