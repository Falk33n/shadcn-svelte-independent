<script
	lang="ts"
	module
>
	import {
		setAccordionHeaderContext,
		validateAccordionItemContext,
		validateAccordionRootContext,
	} from '$components/ui/accordion';
	import type { HTMLDivElementReference } from '$types';
	import { cn } from '$utils';
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AccordionHeaderAttributes = Omit<
		HTMLAttributes<HTMLDivElement>,
		'role'
	>;

	export type AccordionHeaderChildProps = {
		props: AccordionHeaderAttributes & {
			ref: HTMLDivElementReference;
			role: 'heading';
		};
	};

	export type AccordionHeaderProps = AccordionHeaderAttributes & {
		ref?: HTMLDivElementReference;
		child?: Snippet<[AccordionHeaderChildProps]>;
	};

	const source = 'AccordionHeader';
</script>

<script lang="ts">
	validateAccordionRootContext(source);
	validateAccordionItemContext(source);
	setAccordionHeaderContext();

	let {
		ref = $bindable<HTMLDivElementReference>(null),
		child,
		children,
		'class': className,
		'aria-level': ariaLevel = 3,
		...restProps
	}: AccordionHeaderProps = $props();

	const childProps: AccordionHeaderChildProps = {
		props: { ref, 'role': 'heading', 'aria-level': ariaLevel, ...restProps },
	};
</script>

{#if child}
	{@render child(childProps)}
{:else}
	<div
		bind:this={ref}
		role="heading"
		aria-level={ariaLevel}
		class={cn('flex', className)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
