exports.channels = (category) => {
	var sorted = category.children.keyArray();
	sorted.sort((a, b) => {
		var nameA = category.children.find((r) => r.id == a).name;
		var nameB = category.children.find((r) => r.id == b).name;

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});

	sorted.forEach((element, i) => {
		category.children.get(element).edit({ position: i + 1 });
	});
};
