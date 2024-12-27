<script lang="ts">
	import {
		onAccordionKeyboardNavigate,
		onAccordionOpenChange,
		type AccordionItemContextProps,
		type AccordionRootContextProps,
		type AccordionTriggerBaseChildProps,
		type AccordionTriggerBaseProps,
	} from '$components/ui/accordion';
	import { cn } from '$utils';
	import { getContext, setContext } from 'svelte';

	const rootContext: AccordionRootContextProps | undefined = getContext(
		'accordion-root-context',
	);

	if (!rootContext) {
		throw new Error('AccordionTriggerBase must be used within an Accordion');
	}

	const itemContext: AccordionItemContextProps | undefined = getContext(
		'accordion-item-context',
	);

	if (!itemContext) {
		throw new Error(
			'AccordionTriggerBase must be used within an AccordionItem',
		);
	}

	const headerContext: {} | undefined = getContext('accordion-header-context');

	if (!headerContext) {
		throw new Error(
			'AccordionTriggerBase must be used within an AccordionHeader',
		);
	}

	let {
		ref = $bindable<HTMLButtonElement | null>(null),
		child,
		children,
		'aria-expanded': ariaExpanded = itemContext.getState() === 'open',
		'class': className,
		onkeydown = (e) => {
			if (ref) {
				onAccordionKeyboardNavigate(e, ref);
			}
		},
		onclick = () => {
			onAccordionOpenChange(rootContext, itemContext);
		},
		...restProps
	}: AccordionTriggerBaseProps = $props();

	const childProps: AccordionTriggerBaseChildProps = {
		ref,
		'data-accordion': 'trigger' as const,
		'onclick': onclick,
		'onkeydown': onkeydown,
		'id': `accordion-trigger-${itemContext.value}-${rootContext.uniqueID}`,
		'aria-controls': `accordion-content-${itemContext.value}-${rootContext.uniqueID}`,
		'aria-expanded': !!ariaExpanded,
		'data-state': itemContext.getState(),
		'data-disabled': (rootContext.disabled === true ? true : undefined) as
			| true
			| undefined,
		'data-orientation': rootContext.orientation,
	};

	setContext('accordion-trigger-base-context', {});
</script>

{#if child}
	{@render child({
		props: childProps,
	})}
{:else}
	<button
		bind:this={ref}
		{onclick}
		{onkeydown}
		class={cn(
			'group flex h-[45px] flex-1 items-center justify-between px-5 font-medium leading-none outline-none transition-colors hover:bg-secondary focus-visible:ring-1 focus-visible:ring-ring data-[state="closed"]:bg-background data-[state="open"]:bg-secondary data-[state="closed"]:text-foreground data-[state="open"]:text-secondary-foreground',
			className,
		)}
		id={`accordion-trigger-${itemContext.value}-${rootContext.uniqueID}`}
		type="button"
		aria-expanded={ariaExpanded}
		aria-controls={`accordion-content-${itemContext.value}-${rootContext.uniqueID}`}
		data-state={itemContext.getState()}
		data-disabled={(rootContext.disabled === true ? true : undefined) as
			| true
			| undefined}
		data-orientation={rootContext.orientation}
		data-accordion={'trigger' as const}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
