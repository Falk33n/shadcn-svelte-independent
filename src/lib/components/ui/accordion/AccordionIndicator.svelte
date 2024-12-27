<script lang="ts">
	import type {
		AccordionIndicatorChildProps,
		AccordionIndicatorProps,
		AccordionItemContextProps,
		AccordionRootContextProps,
	} from '$components/ui/accordion';
	import { ChevronUp } from '$components/ui/icons';
	import { cn } from '$utils';
	import { getContext } from 'svelte';

	const rootContext: AccordionRootContextProps | undefined = getContext(
		'accordion-root-context',
	);

	if (!rootContext) {
		throw new Error('AccordionIndicator must be used within an Accordion');
	}

	const itemContext: AccordionItemContextProps | undefined = getContext(
		'accordion-item-context',
	);

	if (!itemContext) {
		throw new Error('AccordionIndicator must be used within an AccordionItem');
	}

	const triggerBaseContext: {} | undefined = getContext(
		'accordion-trigger-base-context',
	);

	if (!triggerBaseContext) {
		throw new Error(
			'AccordionIndicator must be used within an AccordionTriggerBase',
		);
	}

	let {
		ref = $bindable<SVGElement | null>(null),
		child,
		'class': className,
		'aria-hidden': ariaHidden = true,
		...restProps
	}: AccordionIndicatorProps = $props();

	const childProps: AccordionIndicatorChildProps = {
		ref,
		'aria-hidden': !!ariaHidden,
	};
</script>

{#if child}
	{@render child({ props: childProps })}
{:else}
	<ChevronUp
		bind:ref
		class={cn(
			'size-5 transition-all duration-300 group-data-[state="closed"]:rotate-180 group-data-[state="open"]:rotate-0 group-data-[state="closed"]:[&>path]:fill-foreground group-data-[state="open"]:[&>path]:fill-secondary-foreground',
			className,
		)}
		aria-hidden={ariaHidden}
		{...restProps}
	/>
{/if}
