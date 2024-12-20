<script lang="ts">
	import type { InputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id = 'text',
		name = id ?? 'text',
		class: className,
		value = $bindable<string | undefined>(),
		ref = $bindable<HTMLInputElement | null>(null),
		autocomplete = 'off',
		disabled,
		onValueChange,
		...props
	}: InputProps = $props();

	function changeValue(newValue: string) {
		value = newValue;
		onValueChange?.(newValue);
	}
</script>

<input
	class={cn(
		'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
		className,
	)}
	type="text"
	onchange={(e) => changeValue(e.currentTarget.value)}
	aria-disabled={disabled}
	bind:this={ref}
	bind:value
	{autocomplete}
	{id}
	{disabled}
	{name}
	{...props}
/>
