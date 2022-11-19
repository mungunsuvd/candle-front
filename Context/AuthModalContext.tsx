import { createContext, useContext, useState } from "react";

interface AuthModalContextInterface {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}
interface AuthModalProviderProps {
	children: React.ReactNode;
}

const ModalContext = createContext<AuthModalContextInterface | undefined>(
	undefined
);

function AuthModalProvider({ children }: AuthModalProviderProps) {
	const [isOpen, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	const onOpen = () => {
		setOpen(true);
	};

	const value = { isOpen, onClose, onOpen };

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
}

function UseAuthContext() {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error("UseAuthContext must be used within a AuthModalProvider");
	}
	return context;
}

export { UseAuthContext, AuthModalProvider };
