import { writable, type Writable } from 'svelte/store';
import { browser } from "$app/environment"

const preValue = (key: string, defalt: number) => {
	const pv =  browser &&  localStorage?.getItem(`dt.${key}`);
	if (pv) {
		return writable(parseFloat(pv))
	}
	return writable(defalt);
}

export const FactoryGlobals = {
	defaultTier: {
		Smelt: preValue("Smelt", 1),
		Assemble: preValue('Assemble', 0.75),
		Research: preValue('Research', 1),
		Chemical: preValue('Chemical', 1),
		Refine: preValue('Refine', 1),
		Particle: preValue('Particle', 1),
		Fractionate: preValue('Fractionate', 1),
		Proliferator: preValue('Proliferator', 1)
	} as Record<string, Writable<number>>,
	availableTiers: {
		Smelt: [1, 2],
		Assemble: [0.75, 1, 1.5, 3],
		Research: [1],
		Refine: [1],
		Chemical: [1],
		Particle: [1],
		Fractionate: [1],
		Proliferator: [0.125, 0.2, 0.25]
	} as Record<'Smelt' | 'Assemble' | 'Research' | 'Refine' | 'Chemical' | 'Particle' | 'Fractionate' | 'Proliferator', number[]>,
	proliferatorUsage: {
		[0.125]: 12,
		[0.2]: 24,
		[0.25]: 60
	} as const,
	proliferatorRecipe: {
		[0.125]: 1141,
		[0.2]: 1142,
		[0.25]: 1143
	}

};