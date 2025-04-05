import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { RecipeType } from '$lib/client/dspdata';

const preValue = () => {
	const storedItem = browser && localStorage?.getItem(`defaultTiers`);
	if (storedItem) {
		const storedValue: Record<RecipeType, number> = JSON.parse(storedItem);
		Object.keys(storedValue).forEach((key) => {
			if (!availableTiers[key].find(i => i === storedValue[key])) {
				storedValue[key] = defaultValues[key as keyof typeof defaultValues];
				console.log(key, storedValue[key]);

			}
		});
		return writable(storedValue);
	}
	return undefined;
};

const availableTiers = {
		Smelt: [1, 2, 3],
		Assemble: [0.75, 1, 1.5, 3],
		Research: [1],
		Refine: [1],
		Chemical: [1, 2],
		Particle: [1],
		Fractionate: [1],
		Proliferator: [0, 0.125, 0.2, 0.25]
	} as Record<RecipeType, number[]>


const defaultValues = {
	Smelt: 1,
	Assemble: 0.75,
	Research: 1,
	Chemical: 1,
	Refine: 1,
	Particle: 1,
	Fractionate: 1,
	Proliferator: 0
};

export const FactoryGlobals = {
	defaultTier: preValue() ?? writable<Record<RecipeType, number>>(defaultValues),
	availableTiers,
	proliferatorUsage: {
		[0.125]: 12,
		[0.2]: 24,
		[0.25]: 60
	} as const,
	proliferatorRecipe: {},
	factoryItems: {
		Smelt: {
			[1]: 2302,
			[2]: 2315,
			[3]: 2319
		},
		Assemble: {
			0.75: 2303,
			1: 2304,
			1.5: 2305,
			3: 2318
		},
		Research: {
			1: 2901,
			2: 2902
		},
		Chemical: {
			1: 2309,
			2: 2317
		},
		Refine: {
			1: 2308
		},
		Particle: {
			1: 2310
		},
		Fractionate: {
			1: 2314
		},
		Proliferator: {
			[0]: null,
			[0.125]: 1141,
			[0.2]: 1142,
			[0.25]: 1143
		}
	}
};

