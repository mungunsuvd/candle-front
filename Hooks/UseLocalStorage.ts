import { useEffect, useRef } from "react";

type Prop = {
	name: string;
	value?: string;
};

export function UseLocalStorage({ name, value }: Prop) {
	const Storage = useRef(window.localStorage);
	const setItem = useRef((val: string) => {
		Storage.current.setItem(name, val);
	});
	const getItem = useRef(() => {
		return Storage.current.getItem(name);
	});

	const removeItem = useRef(() => {
		Storage.current.removeItem(name);
	});

	useEffect(() => {
		if (value) setItem.current(value);
	}, [value]);

	return [getItem.current, setItem.current, removeItem.current];
}
