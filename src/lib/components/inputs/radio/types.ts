import type { CheckboxProps } from '$components/inputs';
import type { Snippet } from 'svelte';
import type {
	HTMLAttributes,
	HTMLFieldsetAttributes,
	HTMLLabelAttributes,
} from 'svelte/elements';

export type RadioProviderProps = {
	groupName: string;
	children: Snippet<[]>;
};

export type RadioContextProps = {
	groupName: string;
	groupValue: () => string;
	onGroupValueChange: (value: string) => void;
};

export type RadioFieldsetProps = Omit<HTMLFieldsetAttributes, 'children'> & {
	ref?: HTMLFieldSetElement | null;
	children: Snippet<[]>;
};

export type RadioLegendProps = Omit<
	HTMLAttributes<HTMLLegendElement>,
	'children'
> & {
	srOnly?: boolean;
	ref?: HTMLLegendElement | null;
	children: Snippet<[]>;
};

export type RadioLabelProps = Omit<HTMLLabelAttributes, 'children'> & {
	ref?: HTMLLabelElement | null;
	children: Snippet<[]>;
};

export type RadioInputProps = Omit<
	CheckboxProps,
	'defaultValue' | 'defaultChecked' | 'onCheckedChange' | 'name'
> & {
	defaultChecked?: boolean;
};
