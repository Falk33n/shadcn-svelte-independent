<script lang="ts">
	import { Check } from '$components/icons';
	import type { CheckboxInputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id,
		name = id,
		'class': className,
		disabled = false,
		'aria-disabled': ariaDisabled = false,
		'aria-label': ariaLabel,
		checked = $bindable(),
		ref = $bindable(null),
		onCheckedChange,
		...props
	}: CheckboxInputProps = $props();

	function changeChecked(newChecked: boolean) {
		checked = newChecked;
		onCheckedChange?.(newChecked);
	}
</script>

<label
	class={cn(
		'inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		disabled && 'cursor-not-allowed opacity-50',
		checked && 'bg-primary',
		className,
	)}
	aria-label={ariaLabel ?? (checked ? 'Checked' : 'Not Checked')}
>
	{#if checked}
		<Check class="scale-150 [&>path]:fill-primary-foreground" />
	{/if}

	<input
		class="sr-only"
		onchange={(e) => changeChecked(e.currentTarget.checked)}
		type="checkbox"
		aria-disabled={ariaDisabled || disabled}
		aria-checked={checked}
		bind:checked
		bind:this={ref}
		{id}
		{name}
		{disabled}
		{...props}
	/>
</label>
