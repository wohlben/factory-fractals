import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const {id} = params;
	const itemId = Number(id);
	return {itemId};
};