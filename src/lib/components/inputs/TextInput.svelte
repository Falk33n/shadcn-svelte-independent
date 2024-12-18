<script lang="ts">
	import type { InputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id,
		name = id,
		class: className,
		value = $bindable(''),
		ref = $bindable(null),
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
	bind:this={ref}
	bind:value
	{id}
	{name}
	{...props}
/>
