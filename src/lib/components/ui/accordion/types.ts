export type AccordionRootContextProps = {
	rootType: 'single' | 'multiple';
	rootValue: { value: string | string[] | undefined };
	isCollapsible: boolean;
	rootID: string;
	rootOnValueChange?: (value: string | string[]) => void;
};

export type AccordionItemContextProps = {
	isItemOpen: { value: boolean };
	itemValue: string;
};
