import type { PageLoad } from './$types';
export const prerender = false;

export const load: PageLoad = ({ params, url }) => {
	const {id} = params;
	const recipeId = Number(id);
	const depth = url.searchParams.get('depth');
	const targetAmount = url.searchParams.get('targetAmount');
	return {recipeId, depth: (depth && parseInt(depth)) || 1, targetAmount: targetAmount && parseInt(targetAmount) || 1};
};