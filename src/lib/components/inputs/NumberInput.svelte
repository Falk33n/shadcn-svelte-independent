<script lang="ts">
	import type { NumberInputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id = 'number',
		name = id ?? 'number',
		class: className,
		value = $bindable<string | undefined>(),
		ref = $bindable<HTMLInputElement | null>(null),
		onNumberChange,
		...props
	}: NumberInputProps = $props();

	function changeValue(newValue: number) {
		value = newValue.toString();
		onNumberChange?.(newValue);
	}
</script>

<input
	class={cn(
		'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
		className,
	)}
	type="number"
	onchange={(e) => changeValue(Number(e.currentTarget.value))}
	bind:this={ref}
	bind:value
	{id}
	{name}
	{...props}
/>
