<script lang="ts">
	import { Check } from '$components/icons';
	import type { CheckboxIconProps } from '$components/inputs/checkbox';
	import { cn } from '$utils';

	let {
		class: className,
		checked,
		ref = $bindable<SVGElement | null>(null),
		...props
	}: CheckboxIconProps = $props();
</script>

{#if checked}
	<Check
		class={cn('scale-150 [&>path]:fill-primary-foreground', className)}
		{ref}
		{...props}
	/>
{/if}
