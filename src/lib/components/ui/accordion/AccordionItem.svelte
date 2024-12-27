<script lang="ts">
	import type {
		AccordionItemChildProps,
		AccordionItemContextProps,
		AccordionItemProps,
		AccordionRootContextProps,
	} from '$components/ui/accordion';
	import { cn } from '$utils';
	import { getContext, setContext } from 'svelte';

	const context: AccordionRootContextProps | undefined = getContext(
		'accordion-root-context',
	);

	if (!context) {
		throw new Error('AccordionItem must be used within an Accordion');
	}

	let {
		ref = $bindable<HTMLDivElement | null>(null),
		child,
		children,
		class: className,
		value,
		disabled = false,
		...restProps
	}: AccordionItemProps = $props();

	function rootValueIsArray() {
		if (Array.isArray(context?.getValue())) {
			return context.getValue()?.includes(value) ? 'open' : 'closed';
		}

		return context?.getValue() === value ? 'open' : 'closed';
	}

	let openState = $state<'open' | 'closed'>(rootValueIsArray());

	const childProps: AccordionItemChildProps = {
		ref,
		'data-state': () => openState,
		'data-disabled': (disabled === true ? true : undefined) as true | undefined,
		'data-orientation': context.orientation,
	};

	setContext<AccordionItemContextProps>('accordion-item-context', {
		getState: () => openState,
		value,
	});

	$effect(() => {
		openState = rootValueIsArray();
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
			'mt-px border-b first:mt-0 focus-within:relative focus-within:z-10',
			className,
		)}
		data-state={openState}
		data-disabled={(disabled === true ? true : undefined) as true | undefined}
		data-orientation={context.orientation}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
