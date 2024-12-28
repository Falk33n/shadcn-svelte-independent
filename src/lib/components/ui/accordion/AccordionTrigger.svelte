<script lang="ts">
	import {
		AccordionHeader,
		AccordionIndicator,
		AccordionTriggerBase,
		onAccordionKeyboardNavigate,
		onAccordionOpenChange,
		type AccordionItemContextProps,
		type AccordionRootContextProps,
		type AccordionTriggerBaseChildProps,
		type AccordionTriggerBaseProps,
	} from '$components/ui/accordion';
	import { cn } from '$utils';
	import { getContext } from 'svelte';

	const rootContext: AccordionRootContextProps | undefined = getContext(
		'accordion-root-context',
	);

	if (!rootContext) {
		throw new Error('AccordionTrigger must be used within an Accordion');
	}

	const itemContext: AccordionItemContextProps | undefined = getContext(
		'accordion-item-context',
	);

	if (!itemContext) {
		throw new Error('AccordionTrigger must be used within an AccordionItem');
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
		'aria-expanded': itemContext.state === 'open',
	};
</script>

<AccordionHeader>
	{#if child}
		{@render child({ props: childProps })}
	{:else}
		<AccordionTriggerBase
			bind:ref
			class={cn(className)}
			{...restProps}
		>
			{@render children?.()}
			<AccordionIndicator />
		</AccordionTriggerBase>
	{/if}
</AccordionHeader>
