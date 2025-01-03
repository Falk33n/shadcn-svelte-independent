export type ToastProps = {
	title: string;
	content: string;
	duration?: number;
};

export type ToastProviderBaseContextProps = {
	isToastVisible: { value: boolean };
	label: string;
	duration: number;
	swipeThreshold: number;
};
