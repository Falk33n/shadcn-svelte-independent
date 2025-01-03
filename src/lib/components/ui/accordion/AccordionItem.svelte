<script
	lang="ts"
	module
>
	import {
		getAccordionRootContext,
		setAccordionItemContext,
	} from '$components/ui/accordion';
	import type { HTMLDivElementReference } from '$types';
	import { cn } from '$utils';
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AccordionItemChildProps = {
		props: HTMLAttributes<HTMLDivElement> & { ref: HTMLDivElementReference };
	};

	export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
		value: string;
		ref?: HTMLDivElementReference;
		child?: Snippet<[AccordionItemChildProps]>;
	};

	const source = 'AccordionItem';
</script>

<script lang="ts">
	const { getRootValue } = getAccordionRootContext(source);

	const rootValue = $derived(getRootValue());

	let isItemOpen = $state(false);
	const getIsItemOpen = () => isItemOpen;
	const setIsItemOpen = (newValue: boolean) => (isItemOpen = newValue);

	let {
		ref = $bindable<HTMLDivElementReference>(null),
		child,
		children,
		class: className,
		value: itemValue,
		...restProps
	}: AccordionItemProps = $props();

	setAccordionItemContext({ getIsItemOpen, setIsItemOpen, itemValue });

	$effect(() => {
		isItemOpen = Array.isArray(rootValue)
			? rootValue.includes(itemValue)
			: rootValue === itemValue;
	});

	const childProps: AccordionItemChildProps = {
		props: { ref, ...restProps },
	};
</script>

{#if child}
	{@render child(childProps)}
{:else}
	<div
		bind:this={ref}
		class={className ? cn(className) : undefined}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
