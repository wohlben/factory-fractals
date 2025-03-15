import { ItemProtoSet, RecipeProtoSet, ThemeProtoSet, VeinProtoSet } from './recipees.json';

export interface ItemType {
	'Name': string,
	'ID': number,
	'Type': string,
	'SubID': number,
	'MiningFrom': string,
	'ProduceFrom': string,
	'Upgrades': number[],
	'IsFluid': boolean,
	'IsEntity': boolean,
	'CanBuild': boolean,
	'BuildInGas': boolean,
	'IconPath': string //"Icons/ItemRecipe/iron-ore",
	'CraftType': number,
	'BuildIndex': number,
	'BuildMode': number,
	'Productive': boolean,
	'DescFields': number[],
	'Description': string
}

export interface RecipeeType {
	'Name': string,
	'ID': number,
	'SID': string //"1101",
	'Type': string // "Smelt",
	'TimeSpend': number //60,
	'Items': number[],
	'ItemCounts': number[],
	'Results': number [],
	'ResultCounts': number[],
}

export interface ResourceType {
	'Name': string,
	'ID': number,
	'DisplayName': string,
	'WaterItemId': number,
	'GasItems': number[],
	'GasSpeeds': number[]
}

export interface VeinType {
	'Name': string,
	'ID': number,
	'MiningItem': number;
	'MiningTime': number
}

export class DSPData {
	static items: ItemType[] = ItemProtoSet.dataArray;
	static recipees: RecipeeType[] = RecipeProtoSet.dataArray;
	static resources: ResourceType[] = ThemeProtoSet.dataArray;
	static veins: VeinType[] = VeinProtoSet.dataArray;

	static fluidItems = new Set(this.items.filter(i => i.IsFluid).map(i => i.ID));
	static buildableItems = new Set(this.items.filter(i => i.CanBuild).map(i => i.ID));
	static entityItems = new Set(this.items.filter(i => i.IsEntity).map(i => i.ID));

	static fluidRecipees = new Set(this.recipees.filter(r => r.Items.find(i => this.fluidItems.has(i)) || r.Results.find(i => this.fluidItems.has(i))).map(i => i.ID));
	static buildableRecipees = new Set(this.recipees.filter(r => r.Items.find(i => this.buildableItems.has(i)) || r.Results.find(i => this.buildableItems.has(i))).map(i => i.ID));
	static entityRecipees = new Set(this.recipees.filter(r => r.Results.find(i => this.entityItems.has(i))).map(i => i.ID));

	static resource = this.resources.reduce((acc, elem) => ({
		...acc,
		[elem.ID]: elem
	}), {} as Record<number, ResourceType>);

	static item = this.items.reduce((acc, elem) => ({ ...acc, [elem.ID]: elem }), {} as Record<number, ItemType>);
	static recipe = this.recipees.reduce((acc, elem) => ({ ...acc, [elem.ID]: elem }), {} as Record<number, RecipeeType>);

	static producedVia = this.recipees.reduce((acc, elem) => {
		elem.Results.forEach(itemId => {
			if (acc[itemId] == undefined) acc[itemId] = [];
			acc[itemId].push(elem);
		});
		return acc;
	}, {} as Record<number, RecipeeType[]>);
	static relatedRecipes = this.recipees.reduce((acc, recipe) => {
		recipe.Items.forEach(itemId => {
			if (acc[itemId] == undefined) acc[itemId] = new Set();
			acc[itemId].add(recipe.ID);
		});
		recipe.Results.forEach(itemId => {
			if (acc[itemId] == undefined) acc[itemId] = new Set();
			acc[itemId].add(recipe.ID);
		});
		return acc;
	}, {} as Record<number, Set<number>>);

	static canBeExtracted = DSPData.resources.reduce((acc, elem) => {
		elem.GasItems.forEach((i, index) => acc[i] = Math.max(elem.GasSpeeds[index], acc[i] ?? 0));
		acc[elem.WaterItemId] = 1;
		return acc;
	}, {} as Record<number, number>);

	static canBeMined = this.veins.reduce((acc, elem) => {
		acc[elem.MiningItem] = elem.MiningTime;
		return acc;
	}, {} as Record<number, number>);

	static alternativeRecipe =
		Object.entries(DSPData.producedVia).reduce((acc, [sitemId, recipees]) => {
			const itemId = Number(sitemId);
			acc[itemId] = recipees.sort((a, b) => a.Items.length - b.Items.length).map(i => i.ID);
			return acc;
		}, {} as Record<number, number[]>);
}
