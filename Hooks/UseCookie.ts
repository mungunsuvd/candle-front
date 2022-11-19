import { useEffect, useRef } from "react";
import Cookies, { CookieSetOptions } from "universal-cookie";

type Prop = {
	name: string;
	value?: string;
	option?: CookieSetOptions;
};

export function UseCookie({ name, value, option }: Prop) {
	const Cookie = new Cookies();
	const setItem = (val: string, opt?: CookieSetOptions) => {
		Cookie.set(name, val, {
			path: "/",
			maxAge: 23 * 3600,
			...opt,
		});
	};
	const getItem = () => {
		return Cookie.get(name);
	};
	const removeItem = () => {
		return Cookie.remove(name);
	};

	useEffect(() => {
		if (value) setItem(value, option);
	}, [value, option]);

	return { getItem, setItem, removeItem } as const;
}
