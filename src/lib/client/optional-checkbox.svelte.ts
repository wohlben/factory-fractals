export function optionalCheckboxSvelte() {
	let active = $state<null|boolean>(null);
	let elementChecked = $state<null|boolean>(false);
	let checked = $derived(active ===  true ? elementChecked : null)

	return {
		get active() {
			return active;
		},
		get checked() {
			return checked;
		},
		set checked(val) {
			active = val === null ? false : active !== null;
			elementChecked = val;
		},
	};
}