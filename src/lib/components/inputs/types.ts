import type { HTMLInputAttributes } from 'svelte/elements';

export type InputProps = Omit<HTMLInputAttributes, 'value' | 'type' | 'id'> & {
	id: string;
	ref?: HTMLInputElement | null;
	value?: string;
	onValueChange?: (value: string) => void;
};

export type CheckboxInputProps = Omit<
	InputProps,
	'children' | 'onValueChange'
> & {
	onCheckedChange?: (checked: boolean) => void;
};

export type FileInputProps = Omit<InputProps, 'value' | 'onValueChange'> & {
	value?: FileList | null;
	onFileChange?: (file: FileList | null) => void;
};

export type NumberInputProps = Omit<InputProps, 'onValueChange'> & {
	onNumberChange?: (number: number) => void;
};
