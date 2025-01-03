<script
	lang="ts"
	module
>
	import {
		getAccordionItemContext,
		validateAccordionRootContext,
		validateAccordionTriggerContext,
	} from '$components/ui/accordion';
	import { ChevronUp } from '$components/ui/icons';
	import type { SVGElementReference } from '$types';
	import { cn } from '$utils';
	import type { Snippet } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';

	export type AccordionIndicatorAttributes = Omit<
		SVGAttributes<SVGElement>,
		'aria-hidden'
	>;

	export type AccordionIndicatorChildProps = {
		props: AccordionIndicatorAttributes & {
			'ref': SVGElementReference;
			'aria-hidden': boolean;
		};
	};

	export type AccordionIndicatorProps = AccordionIndicatorAttributes & {
		ref?: SVGElementReference;
		child?: Snippet<[AccordionIndicatorProps]>;
	};

	const source = 'AccordionIndicator';
</script>

<script lang="ts">
	validateAccordionRootContext(source);
	const { getIsItemOpen } = getAccordionItemContext(source);
	validateAccordionTriggerContext(source);

	const isItemOpen = $derived(getIsItemOpen());

	let {
		ref = $bindable<SVGElementReference>(null),
		child,
		class: className,
		...restProps
	}: AccordionIndicatorProps = $props();

	const childProps: AccordionIndicatorChildProps = {
		props: { ref, 'aria-hidden': true, ...restProps },
	};
</script>

{#if child}
	{@render child(childProps)}
{:else}
	<ChevronUp
		bind:ref
		class={cn(
			'size-5 transition-all duration-300 ease-out [&>path]:fill-foreground',
			isItemOpen && 'rotate-180 ',
			className,
		)}
		aria-hidden={true}
		{...restProps}
	/>
{/if}
