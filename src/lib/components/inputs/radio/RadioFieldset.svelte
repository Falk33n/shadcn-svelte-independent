<script lang="ts">
	import type { RadioFieldsetProps } from '$components/inputs/radio';
	import { cn } from '$utils';

	let {
		class: className,
		children,
		ref = $bindable<HTMLFieldSetElement | null>(null),
		...props
	}: RadioFieldsetProps = $props();
</script>

<fieldset
	class={cn('flex w-full flex-col justify-center gap-2', className)}
	bind:this={ref}
	{...props}
>
	{@render children()}
</fieldset>
