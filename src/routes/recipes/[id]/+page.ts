import type { PageLoad } from './$types';
export const prerender = false;

export const load: PageLoad = ({ params }) => {
	const {id} = params;
	const recipeId = Number(id);
	return {recipeId};
};