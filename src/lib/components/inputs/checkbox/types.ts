import type { InputProps } from '$components/inputs';
import type { Snippet } from 'svelte';
import type { HTMLLabelAttributes } from 'svelte/elements';

export type CheckboxLabelProps = Omit<HTMLLabelAttributes, 'children'> & {
	ref?: HTMLLabelElement | null;
	children: Snippet<[]>;
};

export type CheckboxInputProps = Omit<
	InputProps,
	'children' | 'onValueChange'
> & {
	onCheckedChange?: (checked: boolean) => void;
};
