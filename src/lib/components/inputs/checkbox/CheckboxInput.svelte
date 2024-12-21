<script lang="ts">
	import type { CheckboxInputProps } from '$components/inputs/checkbox';
	import { cn } from '$utils';

	let {
		id = 'checkbox',
		name = id ?? 'checkbox',
		'class': className,
		disabled = false,
		'aria-label': ariaLabel,
		checked = $bindable<boolean | undefined>(),
		ref = $bindable<HTMLInputElement | null>(null),
		autocomplete = 'off',
		onCheckedChange,
		...props
	}: CheckboxInputProps = $props();

	function changeChecked(newChecked: boolean) {
		checked = newChecked;
		onCheckedChange?.(newChecked);
	}
</script>

<input
	class={cn(
		'relative mt-1 aspect-square size-4 cursor-pointer appearance-none rounded-sm border border-primary shadow-sm checked:bg-primary checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 checked:before:mt-px checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:text-primary-foreground checked:before:content-["✓"] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
		className,
	)}
	onchange={(e) => changeChecked(e.currentTarget.checked)}
	type="checkbox"
	aria-disabled={disabled}
	aria-checked={checked}
	aria-live="polite"
	bind:checked
	bind:this={ref}
	{autocomplete}
	{id}
	{name}
	{disabled}
	{...props}
/>
