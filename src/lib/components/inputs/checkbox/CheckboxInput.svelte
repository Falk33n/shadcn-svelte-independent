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
	class={cn('sr-only', className)}
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
