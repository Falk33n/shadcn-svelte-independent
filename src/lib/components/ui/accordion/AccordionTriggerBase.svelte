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
		class: className,
		...restProps
	}: AccordionTriggerBaseProps = $props();

	const childProps: AccordionTriggerBaseChildProps = {
		ref,
		'data-accordion': 'trigger' as const,
		'onclick': () => onAccordionOpenChange(rootContext, itemContext),
		'onkeydown': (e) => {
			if (ref) {
				onAccordionKeyboardNavigate(e, ref);
			}
		},
		'id': `accordion-trigger-${itemContext.value}-${rootContext.uniqueID}`,
		'aria-controls': `accordion-content-${itemContext.value}-${rootContext.uniqueID}`,
		'aria-expanded': itemContext.getItemState() === 'open',
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
		onclick={() => onAccordionOpenChange(rootContext, itemContext)}
		onkeydown={(e) => {
			if (ref) {
				onAccordionKeyboardNavigate(e, ref);
			}
		}}
		class={cn(
			'flex h-[45px] flex-1 items-center justify-between px-5 font-medium leading-none outline-none transition-colors hover:bg-secondary focus-visible:ring-1 focus-visible:ring-ring',
			itemContext.getItemState() === 'open'
				? 'bg-secondary text-secondary-foreground'
				: 'bg-background text-foreground',
			className,
		)}
		id={`accordion-trigger-${itemContext.value}-${rootContext.uniqueID}`}
		type="button"
		aria-expanded={itemContext.getItemState() === 'open'}
		aria-controls={`accordion-content-${itemContext.value}-${rootContext.uniqueID}`}
		disabled={itemContext.disabled || rootContext.disabled}
		data-accordion="trigger"
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
