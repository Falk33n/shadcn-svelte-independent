<script lang="ts">
	import type {
		AccordionHeaderChildProps,
		AccordionHeaderProps,
		AccordionItemContextProps,
		AccordionRootContextProps,
	} from '$components/ui/accordion';
	import { cn } from '$utils';
	import { getContext, setContext } from 'svelte';

	const rootContext: AccordionRootContextProps | undefined = getContext(
		'accordion-root-context',
	);

	if (!rootContext) {
		throw new Error('AccordionHeader must be used within an Accordion');
	}

	const itemContext: AccordionItemContextProps | undefined = getContext(
		'accordion-item-context',
	);

	if (!itemContext) {
		throw new Error('AccordionHeader must be used within an AccordionItem');
	}

	let {
		ref = $bindable<HTMLHeadingElement | null>(null),
		child,
		children,
		class: className,
		...restProps
	}: AccordionHeaderProps = $props();

	const childProps: AccordionHeaderChildProps = {
		ref,
		'data-state': itemContext.getState(),
		'data-disabled': (rootContext.disabled === true ? true : undefined) as
			| true
			| undefined,
		'data-orientation': rootContext.orientation,
	};

	setContext('accordion-header-context', {});
</script>

{#if child}
	{@render child({
		props: childProps,
	})}
{:else}
	<h3
		bind:this={ref}
		class={cn('flex', className)}
		data-state={itemContext.getState()}
		data-disabled={(rootContext.disabled === true ? true : undefined) as
			| true
			| undefined}
		data-orientation={rootContext.orientation}
		{...restProps}
	>
		{@render children?.()}
	</h3>
{/if}
