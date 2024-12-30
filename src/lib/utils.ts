import type { ValidateContextProps } from '$types';
import { type ClassValue, clsx } from 'clsx';
import { getContext } from 'svelte';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateID(length: number = 6) {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let result = '';

	for (let i = 0; i < length; i += 1) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}

	return result;
}

export function validateContext<T>({
	key,
	target,
	source,
}: ValidateContextProps<T>): T {
	const context: T | undefined = getContext(key);

	if (!context) {
		throw new Error(`${target} must be used within an ${source}`);
	}

	return { ...context };
}
