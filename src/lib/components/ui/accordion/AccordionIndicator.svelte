<script
	lang="ts"
	module
>
	import type {
		AccordionItemContextProps,
		AccordionRootContextProps,
	} from '$components/ui/accordion';
	import { ChevronUp } from '$components/ui/icons';
	import type {
		EmptyContext,
		SVGElementReference,
		ValidateContextProps,
	} from '$types';
	import { cn, validateContext } from '$utils';
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

	const rootContextSettings: ValidateContextProps<AccordionRootContextProps> = {
		key: 'accordion-root-context',
		source: 'AccordionRoot',
		target: 'AccordionIndicator',
	};

	const itemContextSettings: ValidateContextProps<AccordionItemContextProps> = {
		key: 'accordion-item-context',
		source: 'AccordionItem',
		target: 'AccordionIndicator',
	};

	const triggerBaseContextSettings: ValidateContextProps<EmptyContext> = {
		key: 'accordion-trigger-base-context',
		source: 'AccordionTriggerBase',
		target: 'AccordionIndicator',
	};
</script>

<script lang="ts">
	validateContext(rootContextSettings);
	const { isItemOpen } = validateContext(itemContextSettings);
	validateContext(triggerBaseContextSettings);

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
			isItemOpen.value && 'rotate-180 ',
			className,
		)}
		aria-hidden={true}
		{...restProps}
	/>
{/if}
