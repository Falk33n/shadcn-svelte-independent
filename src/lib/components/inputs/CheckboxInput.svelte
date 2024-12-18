<script lang="ts">
	import { Check } from '$components/icons';
	import type { CheckboxInputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id = 'checkbox',
		name = id ?? 'checkbox',
		'class': className,
		disabled = false,
		'aria-disabled': ariaDisabled = false,
		'aria-label': ariaLabel,
		checked = $bindable<boolean | undefined>(),
		ref = $bindable<HTMLInputElement | null>(null),
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
		'group inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-primary [&:has(:checked)]:bg-primary [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50 [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-offset-2 [&:has(:focus-visible)]:ring-offset-background ',
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
