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
		'inline-flex w-fit max-w-xs cursor-pointer items-start gap-2.5 font-medium',
		className,
	)}
	bind:this={ref}
	{...props}
>
	{@render children()}
</label>
