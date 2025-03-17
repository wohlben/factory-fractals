// place files you want to import through the `$lib` alias in this folder.
const basePath = '/factory-fractals' as const;
export const LINKS = {
	recipes: () => basePath + '/recipes',
	recipe: (id: number|string) => basePath + '/recipes/' + id,
	item: (id: number|string) => basePath + '/items/' + id,
};