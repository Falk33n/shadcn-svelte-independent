<script lang="ts">
	import type { RadioLegendProps } from '$components/inputs/radio';
	import { cn } from '$utils';

	let {
		class: className,
		srOnly = false,
		children,
		ref = $bindable<HTMLLegendElement | null>(null),
		...props
	}: RadioLegendProps = $props();
</script>

<legend
	class={cn(
		!srOnly ? 'mb-1.5 ml-6 font-bold capitalize' : 'sr-only',
		className,
	)}
	bind:this={ref}
	{...props}
>
	{@render children()}
</legend>
