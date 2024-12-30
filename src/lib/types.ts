export type HTMLDivElementReference = HTMLDivElement | null;
export type SVGElementReference = SVGElement | null;
export type HTMLButtonElementReference = HTMLButtonElement | null;

export type EmptyContext = {};
export type ValidateContextProps<T> = {
	key: string;
	target: string;
	source: string;
};
