<script
	lang="ts"
	module
>
	import type {
		EmptyContext,
		HTMLDivElementReference,
		ValidateContextProps,
	} from '$types';
	import { cn, validateContext } from '$utils';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type {
		AccordionItemContextProps,
		AccordionRootContextProps,
	} from './types';

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

	const rootContextSettings: ValidateContextProps<AccordionRootContextProps> = {
		key: 'accordion-root-context',
		source: 'AccordionRoot',
		target: 'AccordionHeader',
	};

	const itemContextSettings: ValidateContextProps<AccordionItemContextProps> = {
		key: 'accordion-item-context',
		source: 'AccordionItem',
		target: 'AccordionHeader',
	};
</script>

<script lang="ts">
	validateContext(rootContextSettings);
	validateContext(itemContextSettings);

	let {
		ref = $bindable<HTMLDivElementReference>(null),
		child,
		children,
		'class': className,
		'aria-level': ariaLevel = 3,
		...restProps
	}: AccordionHeaderProps = $props();

	setContext<EmptyContext>('accordion-header-context', {});

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
