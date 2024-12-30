<script
	lang="ts"
	module
>
	import type {
		AccordionItemContextProps,
		AccordionRootContextProps,
	} from '$components/ui/accordion';
	import type { HTMLDivElementReference, ValidateContextProps } from '$types';
	import { cn, validateContext } from '$utils';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AccordionItemChildProps = {
		props: HTMLAttributes<HTMLDivElement> & { ref: HTMLDivElementReference };
	};

	export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
		value: string;
		ref?: HTMLDivElementReference;
		child?: Snippet<[AccordionItemChildProps]>;
	};

	type IsItemOpenState = { value: boolean };
	type RootValueState = { value?: string | string[] };

	const rootContextSettings: ValidateContextProps<AccordionRootContextProps> = {
		key: 'accordion-root-context',
		source: 'AccordionRoot',
		target: 'AccordionItem',
	};

	function setIsItemOpen(
		isItemOpen: IsItemOpenState,
		itemValue: string,
		rootValue: RootValueState,
	) {
		isItemOpen.value = Array.isArray(rootValue.value)
			? rootValue.value.includes(itemValue)
			: rootValue.value === itemValue;
	}
</script>

<script lang="ts">
	const { rootValue } = validateContext(rootContextSettings);

	let isItemOpen = $state({ value: false });

	let {
		ref = $bindable<HTMLDivElementReference>(null),
		child,
		children,
		class: className,
		value: itemValue,
		...restProps
	}: AccordionItemProps = $props();

	setContext<AccordionItemContextProps>('accordion-item-context', {
		isItemOpen,
		itemValue,
	});

	$effect(() => {
		setIsItemOpen(isItemOpen, itemValue, rootValue);
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
