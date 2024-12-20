<script lang="ts">
	import type { CheckboxLabelProps } from '$components/inputs/checkbox';
	import { cn } from '$utils';

	let {
		class: className,
		ref = $bindable<HTMLLabelElement | null>(null),
		children,
		...props
	}: CheckboxLabelProps = $props();
</script>

<label
	class={cn(
		'inline-flex size-4 cursor-pointer items-center justify-center rounded-sm border border-primary shadow-sm [&:has(:checked)]:bg-primary [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50 [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-offset-2 [&:has(:focus-visible)]:ring-offset-background',
		className,
	)}
	bind:this={ref}
	{...props}
>
	{@render children()}
</label>
