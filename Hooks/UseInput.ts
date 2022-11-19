import { ChangeEvent, useState } from "react";

export function UseInput(initial?: string) {
	const [value, setValue] = useState(initial || "");

	const bind = {
		value,
		onChange: (event: ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
		},
	};

	const reset = () => {
		setValue("");
	};

	return { value, setValue, bind, reset } as const;
}
