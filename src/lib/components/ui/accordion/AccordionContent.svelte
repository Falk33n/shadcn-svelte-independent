<script lang="ts">
	import {
		onAccordionHeightChange,
		type AccordionContentChildProps,
		type AccordionContentProps,
		type AccordionItemContextProps,
		type AccordionRootContextProps,
	} from '$components/ui/accordion';
	import { cn } from '$utils';
	import { getContext } from 'svelte';

	const rootContext: AccordionRootContextProps | undefined = getContext(
		'accordion-root-context',
	);

	if (!rootContext) {
		throw new Error('AccordionContent must be used within an Accordion');
	}

	const itemContext: AccordionItemContextProps | undefined = getContext(
		'accordion-item-context',
	);

	if (!itemContext) {
		throw new Error('AccordionContent must be used within an AccordionItem');
	}

	let {
		ref = $bindable<HTMLDivElement | null>(null),
		child,
		children,
		class: className,
		...restProps
	}: AccordionContentProps = $props();

	let isHidden = $state(itemContext.getItemState() === 'closed');

	function getIsHidden() {
		return isHidden;
	}

	const childProps: AccordionContentChildProps = {
		ref,
		'style':
			'--accordion-content-height: 0px; height: var(--accordion-content-height);',
		'id': `accordion-content-${itemContext.value}-${rootContext.uniqueID}`,
		'role': 'region' as const,
		'aria-labelledby': `accordion-trigger-${itemContext.value}-${rootContext.uniqueID}`,
		'hidden': getIsHidden(),
	};

	let timeoutId: NodeJS.Timeout | null = null;

	$effect(() => {
		if (!ref) return;
		onAccordionHeightChange(ref, isHidden);

		if (itemContext.getItemState() === 'closed') {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				isHidden = true;
			}, 300);
		} else {
			isHidden = false;
			if (timeoutId) clearTimeout(timeoutId);
		}
	});
</script>

{#if child}
	{@render child({
		props: childProps,
	})}
{:else}
	<div
		bind:this={ref}
		class={cn(
			'overflow-hidden bg-background text-sm text-foreground transition-[height] duration-300 ease-out',
			itemContext.getItemState() === 'open'
				? 'animate-accordion-down'
				: 'animate-accordion-up',
		)}
		style="--accordion-content-height: 0px; height: var(--accordion-content-height);"
		role="region"
		id={`accordion-content-${itemContext.value}-${rootContext.uniqueID}`}
		aria-labelledby={`accordion-trigger-${itemContext.value}-${rootContext.uniqueID}`}
		hidden={isHidden}
		{...restProps}
	>
		<div class={cn('px-5 py-[15px]', className)}>
			{@render children?.()}
		</div>
	</div>
{/if}
