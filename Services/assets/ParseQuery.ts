export const ParseQuery = (param: any) => {
	let obj: any = {};
	obj.attributes = {};
	Object.keys(param).forEach((e) => {
		const [key, ind] = e.split("[]");
		if (key === "priceFilter") {
			if (obj[key]) {
				obj[key][ind] = param[e];
			} else {
				obj[key] = { [ind]: param[e] };
			}
		} else if (key === "attributes") {
			if (param[e].split) {
				obj[key][ind] = [param[e]];
			} else {
				obj[key][ind] = param[e];
			}
		} else {
			if (obj[key]) {
				obj[key].push(param[e]);
			} else {
				obj[key] = [param[e]];
			}
		}
	});
	return obj;
};
