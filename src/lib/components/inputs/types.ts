import type { HTMLInputAttributes } from 'svelte/elements';

export type InputProps = Omit<HTMLInputAttributes, 'value' | 'type'> & {
	ref?: HTMLInputElement | null;
	value?: string;
	onValueChange?: (value: string) => void;
};

export type CheckboxInputProps = InputProps & {
	onCheckedChange?: (checked: boolean) => void;
};

export type FileInputProps = Omit<InputProps, 'value'> & {
	value?: FileList | null;
	onFileChange?: (file: FileList | null) => void;
};
