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
	getRootValue: () => string | string[] | undefined;
	collapsible: boolean;
	orientation: 'horizontal' | 'vertical';
	disabled: boolean;
	uniqueID: string;
	defaultValue?: string | string[];
	setRootValue: (value: string | string[]) => void;
	onValueChange?: (value: string | string[]) => void;
};

export type AccordionRootChildProps = {
	'ref': HTMLDivElement | null;
	'dir': 'ltr' | 'rtl';
	'aria-readonly': boolean;
	'aria-disabled': boolean;
	'aria-orientation': 'horizontal' | 'vertical';
	'data-accordion': 'root';
};

export type AccordionRootProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'dir' | 'aria-orientation' | 'aria-disabled' | 'aria-readonly'
> & {
	type: 'single' | 'multiple';
	ref?: HTMLDivElement | null;
	child?: Snippet<[{ props: AccordionRootChildProps }]>;
	value?: string | string[];
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	collapsible?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	dir?: 'ltr' | 'rtl';
	orientation?: 'horizontal' | 'vertical';
};

export type AccordionItemContextProps = {
	getItemState: () => 'open' | 'closed';
	disabled: boolean;
	value: string;
};

export type AccordionItemChildProps = {
	'ref': HTMLDivElement | null;
	'aria-readonly': boolean;
	'aria-disabled': boolean;
};

export type AccordionItemProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'aria-disabled' | 'aria-readonly' | 'dir' | 'aria-orientation'
> & {
	value: string;
	ref?: HTMLDivElement | null;
	child?: Snippet<[{ props: AccordionItemChildProps }]>;
	disabled?: boolean;
	readonly?: boolean;
};

export type AccordionHeaderChildProps = {
	ref: HTMLHeadingElement | null;
};

export type AccordionHeaderProps = Omit<
	HTMLAttributes<HTMLHeadingElement>,
	'dir' | 'aria-orientation' | 'aria-disabled' | 'aria-readonly'
> & {
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
};

export type AccordionTriggerBaseProps = Omit<
	HTMLButtonAttributes,
	| 'aria-controls'
	| 'id'
	| 'type'
	| 'disabled'
	| 'aria-disabled'
	| 'aria-readonly'
	| 'aria-expanded'
	| 'dir'
	| 'aria-orientation'
	| 'onclick'
	| 'onkeydown'
> & {
	ref?: HTMLButtonElement | null;
	child?: Snippet<[{ props: AccordionTriggerBaseChildProps }]>;
};

export type AccordionIndicatorChildProps = {
	'ref': SVGElement | null;
	'aria-hidden': boolean;
};

export type AccordionIndicatorProps = Omit<
	SVGAttributes<SVGElement>,
	'aria-hidden' | 'dir' | 'aria-orientation' | 'aria-disabled' | 'aria-readonly'
> & {
	ref?: SVGElement | null;
	child?: Snippet<[{ props: AccordionIndicatorChildProps }]>;
};

export type AccordionContentChildProps = {
	'ref': HTMLDivElement | null;
	'style': string;
	'role': 'region';
	'id': string;
	'hidden': boolean;
	'aria-labelledby': string;
};

export type AccordionContentProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	| 'role'
	| 'hidden'
	| 'aria-labelledby'
	| 'id'
	| 'style'
	| 'dir'
	| 'aria-orientation'
	| 'aria-disabled'
	| 'aria-readonly'
> & {
	ref?: HTMLDivElement | null;
	child?: Snippet<[{ props: AccordionContentChildProps }]>;
};
