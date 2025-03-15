import { DSPData } from './dspdata';
import { derived, get, readable, type Readable, type Writable, writable } from 'svelte/store';


class BasePlanner {

	constructor(public recipeId: Writable<number>,
							public itemId: Readable<number>,
							public targetAmount: Readable<number>,
							public targetInterval: Readable<number>
	) {
	}
}

const tallyItems = (a: Record<number, number>, b: Record<number, number>): Record<number, number> => {
	const tallied = { ...a };
	Object.entries(b).forEach(([key, value]) => {
		const itemId = Number(key);
		tallied[itemId] = value;
	});
	return tallied;
};

export class RecipePlanner extends BasePlanner {
	public amountEditable: boolean;

	manualAmount = writable<number>();

	children = writable<RecipePlanner[]>([]);

	canBeMined = derived(this.itemId, (itemId) => DSPData.canBeMined[itemId]);
	canBeExtracted = derived(this.itemId, (itemId) => DSPData.canBeExtracted[itemId]);

	item = derived(this.itemId, (itemId) => DSPData.item[itemId]);
	recipe = derived(this.recipeId, recipeId => DSPData.recipe[recipeId]);

	options = derived(this.itemId, (itemId) => DSPData.alternativeRecipe[itemId]);

	relativeSpeed = derived([this.targetInterval, this.recipe], ([targetInterval, recipe]) => targetInterval / recipe?.TimeSpend);

	requiredBuildings = derived([this.targetAmount, this.recipe, this.itemId, this.relativeSpeed], ([targetAmount, recipe, itemId, relativeSpeed]) => {
		const itemIndex = recipe?.Results.findIndex(i => itemId === i);
		const result = targetAmount / recipe?.ResultCounts[itemIndex] / relativeSpeed;
		return isNaN(result) ? targetAmount : result;
	});

	providedItemsPerInterval = derived([this.recipe, this.relativeSpeed, this.requiredBuildings, this.itemId, this.targetAmount], ([recipe, relativeSpeed, requiredBuildings, itemId, targetAmount]) => {
		if (!recipe && itemId) {
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


	requiredItemsPerInterval = derived([this.recipe, this.relativeSpeed, this.requiredBuildings], ([recipe, relativeSpeed, requiredBuildings]) => {
		const requiredItemsPerInterval: Record<number, number> = {};
		recipe?.Items.forEach((itemId, index) => requiredItemsPerInterval[itemId] = recipe.ItemCounts[index] * relativeSpeed * requiredBuildings);
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
		Object.keys(provisions).forEach((citemId) => {
			const itemId = Number(citemId);
			if (!DSPData.producedVia[itemId]?.length) {
				delete provisions[itemId];
			}
		});
		return provisions;
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


	constructor(_recipeId: number | undefined, _itemId?: number, parentRequiredItemsPerInterval?: Readable<Record<number, number>>, targetInterval?: Readable<number>) {
		const extractOrMinable = !!(_itemId && (DSPData.canBeExtracted[_itemId] || DSPData.canBeMined[_itemId]));

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

		const manualAmount = writable<number>(recipe?.ResultCounts[itemIndex ?? 0] ?? 1);

		const targetAmount = parentRequiredItemsPerInterval ? derived([itemId, parentRequiredItemsPerInterval], ([itemId, parentRequiredItemsPerInterval]) => parentRequiredItemsPerInterval[itemId]) : manualAmount;

		if (!targetInterval) {
			targetInterval = readable(recipe?.TimeSpend);
		}

		super(
			recipeId,
			itemId,
			targetAmount,
			targetInterval
		);

		this.amountEditable = amountEditable;
		this.manualAmount = manualAmount;

		if (!parentRequiredItemsPerInterval) {
			this.children.set(this.dbd());
		}

	}

	setAmount(amount: number) {
		this.manualAmount.set(amount);
	}

	setRecipeId(recipeId: number) {
		this.recipeId.set(recipeId);
		this.expand();
	}

	expand() {
		this.children.set(this.dbd());
	}

	dbd() {
		const children: RecipePlanner[] = [];
		const childrenProvideItemsPerInterval: Record<number, number> = {};
		const recipe = get(this.recipe);
		recipe?.Items.forEach((citemId, index) => {
			if (!DSPData.alternativeRecipe[citemId]?.length) {
				return;
			}

			const planner = new RecipePlanner(undefined, citemId, this.requiredItemsPerInterval, this.targetInterval);
			children.push(planner);
			const providedItemsPerInterval = get(planner.providedItemsPerInterval);

			Object.entries(providedItemsPerInterval).forEach(([key, values]) => {
				childrenProvideItemsPerInterval[Number(key)] = (childrenProvideItemsPerInterval[Number(key)] ?? 0) + values;
			});
		});
		return children;
	}

}
