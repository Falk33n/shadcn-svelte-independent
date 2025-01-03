import { getContext, hasContext, setContext } from 'svelte';

export type AccordionRootContextProps = {
	rootType: 'single' | 'multiple';
	isCollapsible: boolean;
	rootID: string;
	getRootValue: () => string | string[] | undefined;
	setRootValue: (newValue?: string | string[]) => void;
	onRootValueChange?: (newValue?: string | string[]) => void;
};

export type AccordionItemContextProps = {
	getIsItemOpen: () => boolean;
	setIsItemOpen: (newValue: boolean) => void;
	itemValue: string;
};

export function setAccordionRootContext(props: AccordionRootContextProps) {
	return setContext('accordion-root-context', props);
}

export function validateAccordionRootContext(source: string) {
	if (!hasContext('accordion-root-context')) {
		throw new Error(`${source} is not used within an AccordionRoot`);
	}
}

export function getAccordionRootContext(
	source: string,
): AccordionRootContextProps {
	validateAccordionRootContext(source);
	return getContext('accordion-root-context');
}

export function setAccordionItemContext(props: AccordionItemContextProps) {
	return setContext('accordion-item-context', props);
}

export function validateAccordionItemContext(source: string) {
	if (!hasContext('accordion-item-context')) {
		throw new Error(`${source} is not used within an AccordionItem`);
	}
}

export function getAccordionItemContext(
	source: string,
): AccordionItemContextProps {
	validateAccordionItemContext(source);
	return getContext('accordion-item-context');
}

export function setAccordionHeaderContext() {
	return setContext('accordion-header-context', undefined);
}

export function validateAccordionHeaderContext(source: string) {
	if (!hasContext('accordion-header-context')) {
		throw new Error(`${source} is not used within an AccordionHeader`);
	}
}

export function setAccordionTriggerContext() {
	return setContext('accordion-trigger-context', undefined);
}

export function validateAccordionTriggerContext(source: string) {
	if (!hasContext('accordion-trigger-context')) {
		throw new Error(`${source} is not used within an AccordionTriggerBase`);
	}
}
