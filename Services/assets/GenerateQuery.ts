export const GenerateQuery = (param: any) => {
	let arr: any[] = [];
	Object.keys(param).forEach((e) => {
		if (e === "priceFilter") {
			Object.keys(param[e]).map((el: any) => {
				arr.push(`${e}[]${el}=${param[e][el]}`);
			});
		} else if (e === "attributes") {
			Object.keys(param[e]).forEach((el: any) => {
				param[e][el].forEach((element: any) => {
					arr.push(`${e}[]${el}=${element}`);
				});
			});
		} else {
			param[e].forEach((element: any, index: number) => {
				arr.push(`${e}[]${index}=${element}`);
			});
		}
	});
	return arr.join("&");
};
