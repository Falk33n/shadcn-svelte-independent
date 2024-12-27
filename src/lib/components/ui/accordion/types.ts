import type { Snippet } from 'svelte';
import type {
	HTMLAttributes,
	HTMLButtonAttributes,
	KeyboardEventHandler,
	MouseEventHandler,
	SVGAttributes,
} from 'svelte/elements';

export type AccordionRootContextProps = {
	type: 'single' | 'multiple';
	getValue: () => string | string[] | undefined;
	setValue: (value: string | string[]) => void;
	collapsible: boolean;
	disabled: boolean;
	dir: 'ltr' | 'rtl';
	orientation: 'horizontal' | 'vertical';
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	uniqueID: string;
};

export type AccordionItemContextProps = {
	getState: () => 'open' | 'closed';
	value: string;
};

export type AccordionRootChildProps = {
	'ref': HTMLDivElement | null;
	'data-orientation': 'horizontal' | 'vertical';
	'data-accordion': 'root';
};

export type AccordionRootProps = Omit<HTMLAttributes<HTMLDivElement>, 'dir'> & {
	type: 'single' | 'multiple';
	ref?: HTMLDivElement | null;
	child?: Snippet<[{ props: AccordionRootChildProps }]>;
	value?: string | string[];
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	collapsible?: boolean;
	disabled?: boolean;
	dir?: 'ltr' | 'rtl';
	orientation?: 'horizontal' | 'vertical';
};

export type AccordionItemChildProps = {
	'ref': HTMLDivElement | null;
	'data-state': () => 'open' | 'closed';
	'data-disabled'?: true;
	'data-orientation': 'horizontal' | 'vertical';
};

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
	value: string;
	ref?: HTMLDivElement | null;
	child?: Snippet<[{ props: AccordionItemChildProps }]>;
	disabled?: boolean;
};

export type AccordionHeaderChildProps = {
	'ref': HTMLHeadingElement | null;
	'data-state': 'open' | 'closed';
	'data-disabled'?: true;
	'data-orientation': 'horizontal' | 'vertical';
};

export type AccordionHeaderProps = HTMLAttributes<HTMLHeadingElement> & {
	ref?: HTMLHeadingElement | null;
	child?: Snippet<[{ props: AccordionHeaderChildProps }]>;
};

export type AccordionTriggerBaseChildProps = {
	'ref': HTMLButtonElement | null;
	'data-accordion': 'trigger';
	'onkeydown': KeyboardEventHandler<HTMLButtonElement> | null;
	'onclick': MouseEventHandler<HTMLButtonElement> | null;
	'aria-controls': string;
	'aria-expanded': boolean;
	'id': string;
	'data-state': 'open' | 'closed';
	'data-disabled'?: true;
	'data-orientation': 'horizontal' | 'vertical';
};

export type AccordionTriggerBaseProps = Omit<
	HTMLButtonAttributes,
	'aria-controls' | 'id' | 'type'
> & {
	ref?: HTMLButtonElement | null;
	child?: Snippet<[{ props: AccordionTriggerBaseChildProps }]>;
};

export type AccordionIndicatorChildProps = {
	'ref': SVGElement | null;
	'aria-hidden': boolean;
};

export type AccordionIndicatorProps = SVGAttributes<SVGElement> & {
	ref?: SVGElement | null;
	child?: Snippet<[{ props: AccordionIndicatorChildProps }]>;
};

export type AccordionContentChildProps = {
	'ref': HTMLDivElement | null;
	'style': string;
	'role': 'region';
	'aria-labelledby': string;
	'id': string;
	'hidden': true | undefined;
	'data-state': 'open' | 'closed';
	'data-disabled'?: true;
	'data-orientation': 'horizontal' | 'vertical';
};

export type AccordionContentProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'role' | 'hidden' | 'aria-labelledby' | 'id'
> & {
	ref?: HTMLDivElement | null;
	child?: Snippet<[{ props: AccordionContentChildProps }]>;
};
