<script
	module
	lang="ts"
>
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type CheckboxProps = Omit<HTMLButtonAttributes, 'value' | 'type'> & {
		ref?: HTMLButtonElement | null;
		checked?: boolean;
		onCheckedChange?: (checked: boolean) => void;
	};
</script>

<script lang="ts">
	import { Checked } from '$components/icons';
	import { cn } from '$utils';

	let {
		id,
		name = id,
		'class': className,
		disabled = false,
		'aria-disabled': ariaDisabled = false,
		checked = $bindable(false),
		ref = $bindable(null),
		onCheckedChange,
		...props
	}: CheckboxProps = $props();

	function changeChecked(newChecked: boolean) {
		checked = newChecked;

		if (onCheckedChange) {
			onCheckedChange(newChecked);
		}
	}
</script>

<button
	class={cn(
		'inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		checked && 'bg-primary',
		className,
	)}
	role="checkbox"
	aria-checked={checked}
	aria-disabled={ariaDisabled || disabled}
	onclick={() => changeChecked(!checked)}
	type="button"
	bind:this={ref}
	{disabled}
	{...props}
>
	{#if checked}
		<Checked class="size-4 [&>path]:fill-primary-foreground" />
	{/if}
</button>
