<script
	module
	lang="ts"
>
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type TextInputProps = Omit<HTMLInputAttributes, 'value' | 'type'> & {
		ref?: HTMLInputElement | null;
		value?: string;
		onValueChange?: (value: string) => void;
	};
</script>

<script lang="ts">
	import { cn } from '$utils';

	let {
		id,
		name = id,
		class: className,
		value = $bindable(),
		ref = $bindable(null),
		onValueChange,
		...props
	}: TextInputProps = $props();

	function changeValue(newValue: string) {
		value = newValue;

		if (onValueChange) {
			onValueChange(newValue);
		}
	}
</script>

<input
	class={cn(
		'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
		className,
	)}
	type="text"
	onchange={(e) => changeValue(e.currentTarget.value)}
	bind:this={ref}
	bind:value
	{id}
	{name}
	{...props}
/>
