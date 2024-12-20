import type { HTMLInputAttributes } from 'svelte/elements';

export type InputProps = Omit<HTMLInputAttributes, 'value' | 'type' | 'id'> & {
	id: string;
	ref?: HTMLInputElement | null;
	value?: string;
	onValueChange?: (value: string) => void;
};

export type CheckboxProps = Omit<InputProps, 'children' | 'onValueChange'> & {
	onCheckedChange?: (checked: boolean) => void;
};

export type FileInputProps = Omit<InputProps, 'value' | 'onValueChange'> & {
	files?: FileList | null;
	onFileChange?: (file: FileList | null) => void;
};

export type NumberInputProps = Omit<
	InputProps,
	'defaultValue' | 'min' | 'max' | 'value' | 'step' | 'onValueChange'
> & {
	value?: number;
	step?: number;
	min?: number;
	max?: number;
	defaultValue?: number;
	onNumberChange?: (number: number) => void;
};

export type NumberKeyboardEvent = KeyboardEvent & {
	currentTarget: EventTarget & HTMLButtonElement;
};
