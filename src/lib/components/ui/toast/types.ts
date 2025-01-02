export type ToastProps = {
	id: string;
	title: string;
	content: string;
	duration?: number;
};

export type ToastProviderBaseContextProps = {
	activeToast: { value?: ToastProps };
	isToastVisible: { value: boolean };
	label: string;
	duration: number;
	swipeThreshold: number;
	showToast(
		activeToast: { value?: ToastProps },
		title: string,
		content: string,
		duration?: number,
	): void;
};

export type ToastViewportContextProps = {
	activeToast: { value?: ToastProps };
};
