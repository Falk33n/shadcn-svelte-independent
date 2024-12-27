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

		if (Array.isArray(context.rootValue)) {
			return context.rootValue.includes(value) ? 'open' : 'closed';
		}

		if (context.rootValue === value) {
			return 'open';
		}

		return 'closed';
	}

	let openState = $state<'open' | 'closed'>(rootValueIsArray());

	const childProps: AccordionItemChildProps = {
		ref,
		'aria-readonly': readonly,
		'aria-disabled': disabled,
	};

	function getOpenState() {
		return openState;
	}

	setContext<AccordionItemContextProps>('accordion-item-context', {
		state: getOpenState(),
		disabled,
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
