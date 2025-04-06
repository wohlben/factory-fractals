import { DSPData } from './dspdata';
import { derived, get, type Readable, type Writable, writable } from 'svelte/store';
import { FactoryGlobals } from '$lib/client/factory-globals';
import { assets } from '$app/paths';


class BasePlanner {

	constructor(public recipeId: Writable<number>,
							public itemId: Readable<number>,
							public targetAmount: Readable<number>,
							public targetInterval: Readable<number|null>,
							public tier: Writable<number>,
							public proliferator: Writable<number>,
							public timeSpend: Readable<number>
	) {
	}
}

const tallyItems = (a: Record<number, number>, b: Record<number, number>): Record<number, number> => {
	const tallied = { ...a };
	Object.entries(b).forEach(([key, value]) => {
		const itemId = Number(key);
		tallied[itemId] = (tallied[itemId] ?? 0) + value;
	});
	return tallied;
};

export class RecipePlanner extends BasePlanner {
	public amountEditable: boolean;

	manualAmount = writable<number>();
	manualInterval: Writable<number|null>;

	children = writable<RecipePlanner[]>([]);

	canBeMined = derived(this.itemId, (itemId) => DSPData.canBeMined[itemId]);
	canBeExtracted = derived(this.itemId, (itemId) => DSPData.canBeExtracted[itemId]);

	item = derived(this.itemId, (itemId) => DSPData.item[itemId]);
	recipe = derived(this.recipeId, recipeId => DSPData.recipe[recipeId]);
	header = derived([this.itemId, this.recipe], ([itemId, recipe], ) => {
		const _itemId = itemId ?? recipe?.Results?.[0]
		if (!_itemId) return;
		const item = DSPData.item[_itemId]
		const path = item.IconPath.split('/');
		const name = path[path.length - 1]
		return name && [assets + `/dsp_sprites/${name}.png`, item.Name];
	})


	options = derived(this.itemId, (itemId) => DSPData.alternativeRecipe[itemId]);

	timeSpendChanged = derived(this.timeSpend, (timeSpend, set) => {
		set(!!timeSpend);
		const timeout = setTimeout(() => set(!timeSpend), 1400);
		return () => clearTimeout(timeout);
	});

	relativeSpeed = derived([this.targetInterval, this.timeSpend], ([targetInterval, timeSpend]) => !targetInterval ? 1 : targetInterval / timeSpend);

	requiredBuildings = derived([this.targetAmount, this.recipe, this.itemId, this.relativeSpeed, this.proliferator], ([targetAmount, recipe, itemId, relativeSpeed, proliferator]) => {
		const itemIndex = recipe?.Results.findIndex(i => itemId === i);

		const result = targetAmount / recipe?.ResultCounts[itemIndex] / relativeSpeed;
		return isNaN(result) ? targetAmount : result;
	});

	providedItemsPerInterval = derived([this.recipe, this.relativeSpeed, this.requiredBuildings, this.itemId, this.targetAmount], ([recipe, relativeSpeed, requiredBuildings, itemId, targetAmount]) => {
		if (!recipe && itemId && (DSPData.canBeMined[itemId] || DSPData.canBeExtracted[itemId])) {
			return { [itemId]: targetAmount };
		}

		const providedItemsPerInterval: Record<number, number> = {};
		recipe?.Results.forEach((itemId, index) => {
			providedItemsPerInterval[itemId] = recipe.ResultCounts[index] * relativeSpeed * requiredBuildings;
		});

		return providedItemsPerInterval;
	});

	childrenProvideItemsPerInterval: Readable<Record<number, number>> = derived(this.children, (children, set) => {
		const allProvisions: Record<number, number>[] = new Array(children.length);

		const unsubscribes = children.map((child, index) => {
			return child.providedItemsPerInterval.subscribe((providedItems) => {
				// Recalculate the reduced value whenever any child store changes
				allProvisions[index] = providedItems;
				const reducedValue = allProvisions.filter(i => !!i).reduce((acc, itms) => {
					return tallyItems(acc, itms);
				}, {} as Record<number, number>);
				set(reducedValue);
			});
		});
		const reducedValue = allProvisions.filter(i => !!i).reduce((acc, itms) => {
			return tallyItems(acc, itms);
		}, {} as Record<number, number>);
		set(reducedValue);

		// Return a cleanup function to unsubscribe from all child stores
		return () => unsubscribes.forEach(unsubscribe => unsubscribe());
	});


	requiredBuildingsByRecipeId: Readable<Record<number, number>> = derived([this.children, this.recipeId, this.requiredBuildings], ([children, recipe, requiredBuildings], set) => {
		const allRequiredBuildings: Record<number, number>[] = new Array(children.length);


		const unsubscribes = children.map((child, index) => {
			return child.requiredBuildingsByRecipeId.subscribe((rb) => {
				// Recalculate the reduced value whenever any child store changes
				allRequiredBuildings[index] = rb;
				const reducedValue = allRequiredBuildings.filter(i => !!i).reduce((acc, childrenRequiredBuildings) => {
					return tallyItems(acc, childrenRequiredBuildings);
				}, {} as Record<number, number>);
				if (recipe) {
					const iId = recipe;
					reducedValue[iId] = (reducedValue[iId] ?? 0) + requiredBuildings;
				}
				set(reducedValue);
			});
		});
		const reducedValue = allRequiredBuildings.filter(i => !!i).reduce((acc, childrenRequiredBuildings) => {
			return tallyItems(acc, childrenRequiredBuildings);
		}, {} as Record<number, number>);
		if (recipe) {
			const iId = recipe;
			reducedValue[iId] = (reducedValue[iId] ?? 0) + requiredBuildings;
		}
		set(reducedValue);

		// Return a cleanup function to unsubscribe from all child stores
		return () => unsubscribes.forEach(unsubscribe => unsubscribe());
	});

	fabsByType = derived(this.requiredBuildingsByRecipeId, (rb) => {
		return Object.entries(rb).reduce((acc, [key, fabs]) => {
			const recipeId = Number(key);
			const recipeType = DSPData.recipe[recipeId].Type;
			acc[recipeType] = (acc[recipeType] ?? 0) + Math.ceil(fabs);
			return acc;
		}, {} as Record<string, number>);
	});


	childrenByItemId: Readable<Record<number, RecipePlanner>> = derived(this.children, (children, set) => {
		const allChildren: [number, RecipePlanner][] = new Array(children.length);

		const unsubscribes = children.map((child, index) => {
			return child.itemId.subscribe((itemId) => {
				// Recalculate the reduced value whenever any child store changes
				allChildren[index] = [itemId, child];
				const reducedValue = allChildren.filter(i => !!i).reduce((acc, [itemId, planner]) => {
					acc[itemId] = planner;
					return acc;
				}, {} as Record<number, RecipePlanner>);
				set(reducedValue);
			});
		});
		const reducedValue = allChildren.filter(i => !!i).reduce((acc, [itemId, planner]) => {
			acc[itemId] = planner;
			return acc;
		}, {} as Record<number, RecipePlanner>);
		set(reducedValue);

		// Return a cleanup function to unsubscribe from all child stores
		return () => unsubscribes.forEach(unsubscribe => unsubscribe());
	});


	requiredItemsPerInterval = derived([this.recipe, this.relativeSpeed, this.requiredBuildings], ([recipe, relativeSpeed, requiredBuildings]) => {
		const requiredItemsPerInterval: Record<number, number> = {};
		recipe?.Items.forEach((itemId, index) => requiredItemsPerInterval[itemId] = recipe.ItemCounts[index] * relativeSpeed * requiredBuildings);
		return requiredItemsPerInterval;
	});

	deficitRequiredItemsPerInterval = derived([this.recipe, this.relativeSpeed, this.requiredBuildings], ([recipe, relativeSpeed, requiredBuildings]) => {
			const requiredItemsPerInterval: Record<number, number> = {};
			recipe?.Items.forEach((itemId, index) => requiredItemsPerInterval[itemId] = -(recipe.ItemCounts[index] * relativeSpeed * requiredBuildings));
			return requiredItemsPerInterval;
		});
	inputsOutputs = derived([this.childrenProvideItemsPerInterval, this.requiredItemsPerInterval, this.providedItemsPerInterval], ([providedItemsPerInterval, requiredItemsPerInterval, providedItems]) => {
		const itemIds = new Set<number>();
		Object.keys(requiredItemsPerInterval).forEach((itemId) => {
			itemIds.add(Number(itemId));
		});
		Object.keys(providedItemsPerInterval ?? {}).forEach((itemId) => {
			itemIds.add(Number(itemId));
		});
		Object.keys(providedItems).forEach((itemId) => {
			itemIds.add(Number(itemId));
		});
		return itemIds;
	});
	surplus = derived([this.childrenProvideItemsPerInterval, this.requiredItemsPerInterval, this.providedItemsPerInterval, this.itemId], ([childrenprovidedItemsPerInterval, requiredItemsPerInterval, providedItemsPerInterval, itemId]) => {
		const allProvided = tallyItems(childrenprovidedItemsPerInterval, providedItemsPerInterval);
		Object.entries(requiredItemsPerInterval).forEach(([sitemId, items]) => allProvided[Number(sitemId)] = (allProvided[Number(sitemId)] ?? 0) - items);
		Object.entries(allProvided).filter(([, amount]) => amount <= 0).forEach(([citemId]) => delete allProvided[Number(citemId)]);
		return allProvided;
	});
	deficit = derived([this.childrenProvideItemsPerInterval, this.requiredItemsPerInterval], ([childrenProvideItemsPerInterval, requiredItemsPerInterval]) => {
		const provisions = { ...childrenProvideItemsPerInterval };
		Object.entries(requiredItemsPerInterval).forEach(([sitemId, items]) => provisions[Number(sitemId)] = (provisions[Number(sitemId)] ?? 0) - items);
		Object.entries(provisions).filter(([, amount]) => amount >= 0).forEach(([citemId]) => delete provisions[Number(citemId)]);
	/*	Object.keys(provisions).forEach((citemId) => {
			const itemId = Number(citemId);
			if (!DSPData.producedVia[itemId]?.length) {
				delete provisions[itemId];
			}
		});*/
		return provisions;
	});

	deficitByItemId: Readable<Record<number, number>> = derived([this.children, this.deficit, this.recipeId, this.itemId, this.targetAmount], ([children, deficit, recipeId, itemId, targetAmount], set) => {
		const allRequiredBuildings: Record<number, number>[] = new Array(children.length);


		const unsubscribes = children.map((child, index) => {
			return child.deficitByItemId.subscribe((rb) => {
				// Recalculate the reduced value whenever any child store changes
				allRequiredBuildings[index] = rb;
				const reducedValue = allRequiredBuildings.filter(i => !!i).reduce((acc, childrenRequiredBuildings) => {
					return tallyItems(acc, childrenRequiredBuildings);
				}, recipeId ? deficit : { [itemId]: -targetAmount });
				set(reducedValue);
			});
		});
		const reducedValue = allRequiredBuildings.filter(i => !!i).reduce((acc, childrenRequiredBuildings) => {
			return tallyItems(acc, childrenRequiredBuildings);
		}, recipeId ? deficit : { [itemId]: -targetAmount });
		set(reducedValue);

		// Return a cleanup function to unsubscribe from all child stores
		return () => unsubscribes.forEach(unsubscribe => unsubscribe());
	});


	totals = derived([this.itemId, this.requiredBuildings, this.children], ([itemId, requiredBuildings, children]) => {
		const totals = {} as { [key: number]: number };
		totals[itemId] = requiredBuildings;
		children.map(i => i.totals).forEach(cTotals => {
			Object.entries(cTotals).forEach(([cItem, fabs]) => {
				const cItemId = Number(cItem);
				totals[cItemId] = (totals[cItemId] ?? 0) + fabs;
			});
		});
		return totals;
	});


	constructor(_recipeId: number | undefined, _itemId?: number, parentRequiredItemsPerInterval?: Readable<Record<number, number>>, targetInterval?: Readable<number|null>, public depth = 0, targetDepth = 1, initTargetAmount?: number) {
		const extractOrMinable = !!(_itemId && (DSPData.canBeExtracted[_itemId] || DSPData.canBeMined[_itemId]));

		if (!_recipeId && _itemId) {
			const defaultRecipeToProcureItem = get(FactoryGlobals.defaultRecipes)[_itemId];
			if (!!defaultRecipeToProcureItem) _recipeId = defaultRecipeToProcureItem;
		}

		if (!_recipeId && !extractOrMinable) {
			_recipeId = DSPData.alternativeRecipe[_itemId as number]?.[0];
		}

		const recipeId = writable<number>(_recipeId);
		const recipe = _recipeId ? DSPData.recipe[_recipeId] : undefined;

		let itemIndex = recipe?.Results.findIndex(i => _itemId === i);

		const amountEditable = !_itemId;

		if (!_itemId && (itemIndex ?? -1) >= 0) {
			_itemId = recipe?.Results[itemIndex ?? 0];
		}

		const itemId = writable<number>(_itemId);

		const manualAmount = writable<number>(recipe?.ResultCounts[itemIndex ?? 0] ?? initTargetAmount ?? 1);

		const targetAmount = parentRequiredItemsPerInterval ? derived([itemId, parentRequiredItemsPerInterval], ([itemId, parentRequiredItemsPerInterval]) => parentRequiredItemsPerInterval[itemId]) : manualAmount;

		const tier = writable(recipe?.Type ? get(FactoryGlobals.defaultTier)[recipe.Type] : 1);
		const proliferator = writable(get(FactoryGlobals.defaultTier).Proliferator);

		const manualInterval = writable<number|null>(get(FactoryGlobals.defaultInterval) ?? null);

		const timeSpend = derived([recipeId, tier], ([recipeId, tier]) => DSPData.recipe[recipeId]?.TimeSpend / tier);

		if (!targetInterval) {
			targetInterval = manualInterval;
		}

		super(
			recipeId,
			itemId,
			targetAmount,
			targetInterval,
			tier,
			proliferator,
			timeSpend
		);

		this.amountEditable = amountEditable;
		this.manualAmount = manualAmount;
		this.manualInterval = manualInterval;

		if (targetDepth > depth) {
			this.children.set(this.dbd(targetDepth));
		}

	}

	setAmount(amount: number) {
		this.manualAmount.set(amount);
	}

	setRecipeId(recipeId: number) {
		this.recipeId.set(recipeId);
		this.expand();
	}

	deleteChild(itemId: number) {
		this.children.update(children => {
			const index = children.findIndex(i => get(i.itemId) === itemId);
			children.splice(index, 1);
			return children;
		});
	}

	setInterval(interval: number) {
		this.manualInterval.set(interval);
	}

	expand() {
		this.children.set(this.dbd());
	}

	planFor(itemId: number) {
		const ti = derived(([this.timeSpend, this.targetInterval]), ([ts, ti] ) => ti === null ? ts : ti);
		this.children.update(children => {
			children.push(new RecipePlanner(undefined, itemId, this.requiredItemsPerInterval, ti , this.depth + 1));
			return children;
		});
	}

	dbd(targetDepth?: number) {
		const ti = derived(([this.timeSpend, this.targetInterval]), ([ts, ti] ) => ti === null ? ts : ti);

		const children: RecipePlanner[] = [];
		const childrenProvideItemsPerInterval: Record<number, number> = {};
		const recipe = get(this.recipe);
		recipe?.Items.forEach((citemId, index) => {
			if (!DSPData.alternativeRecipe[citemId]?.length) {
				return;
			}

			const planner = new RecipePlanner(undefined, citemId, this.requiredItemsPerInterval,  ti, this.depth + 1, targetDepth);
			children.push(planner);
			const providedItemsPerInterval = get(planner.providedItemsPerInterval);

			Object.entries(providedItemsPerInterval).forEach(([key, values]) => {
				childrenProvideItemsPerInterval[Number(key)] = (childrenProvideItemsPerInterval[Number(key)] ?? 0) + values;
			});
		});
		return children;
	}

}
