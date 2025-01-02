export type HTMLDivElementReference = HTMLDivElement | null;
export type SVGElementReference = SVGElement | null;
export type HTMLButtonElementReference = HTMLButtonElement | null;
export type HTMLOListElementReference = HTMLOListElement | null;
export type HTMLLIElementReference = HTMLLIElement | null;

export type EmptyContext = {};
export type ValidateContextProps<T> = {
	key: string;
	target: string;
	source: string;
};
