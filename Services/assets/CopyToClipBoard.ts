import { Toaster } from "./Toaster";

export const copyToClipboard = (
	value: string,
	setClicked: (flag: boolean) => void = () => {}
) => {
	navigator.clipboard.writeText(value).then(
		function success() {
			Toaster({ type: "copy_success" });
			setClicked(true);
			setTimeout(() => {
				setClicked(false);
			}, 2000);
		},
		function error() {
			Toaster({ type: "copy_success" });
		}
	);
};
