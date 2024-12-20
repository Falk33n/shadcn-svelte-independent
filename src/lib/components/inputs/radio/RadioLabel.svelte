<script lang="ts">
	import type { RadioLabelProps } from '$components/inputs/radio';
	import { cn } from '$utils';

	let {
		class: className,
		ref = $bindable<HTMLLabelElement | null>(null),
		children,
		...props
	}: RadioLabelProps = $props();
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
