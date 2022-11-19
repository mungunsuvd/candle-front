import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Prop = boolean;

export function UseBodyLock(props: Prop) {
	const [isLocked, setLocked] = useState(props);

	const toggleLocked = () => {
		setLocked((p) => !p);
	};

	useEffect(() => {
		const body = document.getElementsByTagName("body")[0];
		if (isLocked) {
			body.classList.add("locked");
		} else {
			body.classList.remove("locked");
		}
		return () => {
			body.classList.remove("locked");
		};
	}, [isLocked]);

	return { setLocked, toggleLocked } as const;
}
