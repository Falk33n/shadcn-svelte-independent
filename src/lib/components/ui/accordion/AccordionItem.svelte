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
		readonly = false,
		...restProps
	}: AccordionItemProps = $props();

	function rootValueIsArray() {
		if (!context) return 'closed';

		if (Array.isArray(context.getRootValue())) {
			return context.getRootValue()?.includes(value) ? 'open' : 'closed';
		}

		if (context.getRootValue() === value) {
			return 'open';
		}

		return 'closed';
	}

	let itemState = $state<'open' | 'closed'>(rootValueIsArray());

	const childProps: AccordionItemChildProps = {
		ref,
		'aria-readonly': readonly,
		'aria-disabled': disabled,
	};

	setContext<AccordionItemContextProps>('accordion-item-context', {
		getItemState: () => itemState,
		disabled,
		value,
	});

	$effect(() => {
		itemState = rootValueIsArray();
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
			'border-b',
			disabled && 'cursor-not-allowed opacity-50',
			readonly && 'opacity-80',
			className,
		)}
		aria-readonly={readonly}
		aria-disabled={disabled}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
