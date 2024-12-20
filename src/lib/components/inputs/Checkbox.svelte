<script lang="ts">
	import { Check } from '$components/icons';
	import type { CheckboxProps } from '$components/inputs';
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
	}: CheckboxProps = $props();

	function changeChecked(newChecked: boolean) {
		checked = newChecked;
		onCheckedChange?.(newChecked);
	}
</script>

<label
	class={cn(
		'inline-flex size-4 cursor-pointer items-center justify-center rounded-sm border border-primary shadow-sm [&:has(:checked)]:bg-primary [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50 [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-offset-2 [&:has(:focus-visible)]:ring-offset-background',
		className,
	)}
>
	<input
		class="sr-only"
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

	{#if checked}
		<Check class="scale-150 [&>path]:fill-primary-foreground" />
	{/if}
</label>
