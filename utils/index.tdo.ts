import { ChangeEvent } from "react";

export type Bind = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
