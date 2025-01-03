<script
	lang="ts"
	module
>
	import {
		getAccordionItemContext,
		getAccordionRootContext,
	} from '$components/ui/accordion';
	import type { HTMLDivElementReference } from '$types';
	import { cn } from '$utils';
	import { onMount, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AccordionContentAttributes = Omit<
		HTMLAttributes<HTMLDivElement>,
		'role' | 'hidden' | 'aria-labelledby' | 'id' | 'style'
	>;

	export type AccordionContentChildProps = {
		props: AccordionContentAttributes & {
			'ref': HTMLDivElementReference;
			'style': string;
			'role'?: 'region';
			'id': string;
			'hidden': boolean;
			'aria-labelledby': string;
			'data-accordion': 'content';
		};
	};

	export type AccordionContentProps = AccordionContentAttributes & {
		ref?: HTMLDivElementReference;
		child?: Snippet<[AccordionContentChildProps]>;
	};

	const source = 'AccordionContent';
	const style =
		'--accordion-content-height: 0px; height: var(--accordion-content-height);';

	function setHeight(ref: HTMLDivElement | null, hidden: boolean) {
		if (!ref) return;
		const contentHeight = !hidden ? `${ref.scrollHeight}px` : '0px';
		ref.style.setProperty('--accordion-content-height', contentHeight);
	}

	let timeoutId: NodeJS.Timeout;

	function delaySetHidden(
		isItemOpen: boolean,
		setHidden: (newValue: boolean) => void,
	) {
		if (!isItemOpen) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setHidden(true);
			}, 300);
		} else {
			setHidden(false);
		}
	}

	function getContentSiblings(
		ref: HTMLDivElement,
		setRole: (newValue?: 'region') => void,
	) {
		const rootAccordion = ref.closest<HTMLDivElement>(
			'[data-accordion="root"]',
		);

		if (!rootAccordion) {
			setRole('region');
			return [];
		}

		return Array.from(
			rootAccordion.querySelectorAll<HTMLDivElement>(
				'[data-accordion="content"]',
			),
		);
	}

	function modifyRole(
		ref: HTMLDivElement | null,
		rootType: 'single' | 'multiple',
		setRole: (newValue?: 'region') => void,
	) {
		if (!ref || rootType === 'single') {
			setRole('region');
			return;
		}

		const contents = getContentSiblings(ref, setRole);

		setRole(contents.length <= 6 ? 'region' : undefined);
	}
</script>

<script lang="ts">
	const { rootType, rootID } = getAccordionRootContext(source);
	const { itemValue, getIsItemOpen } = getAccordionItemContext(source);

	const isItemOpen = $derived(getIsItemOpen());

	let hidden = $state(true);
	const getHidden = () => hidden;
	const setHidden = (newValue: boolean) => (hidden = newValue);

	let role = $state<'region' | undefined>();
	const getRole = () => role;
	const setRole = (newValue?: 'region') => (role = newValue);

	let {
		ref = $bindable<HTMLDivElementReference>(null),
		child,
		children,
		class: className,
		...restProps
	}: AccordionContentProps = $props();

	onMount(() => {
		modifyRole(ref, rootType, setRole);
		setHeight(ref, hidden);
		delaySetHidden(isItemOpen, setHidden);
	});

	$effect(() => {
		setHeight(ref, hidden);
		delaySetHidden(isItemOpen, setHidden);
	});

	const ariaLabelledby = `accordion-trigger-${itemValue}-${rootID}`;
	const id = `accordion-content-${itemValue}-${rootID}`;

	const childProps: AccordionContentChildProps = {
		props: {
			ref,
			id,
			style,
			'role': getRole(),
			'aria-labelledby': ariaLabelledby,
			'data-accordion': 'content',
			'hidden': getHidden(),
			...restProps,
		},
	};
</script>

{#if child}
	{@render child(childProps)}
{:else}
	<div
		bind:this={ref}
		{style}
		{id}
		{hidden}
		{role}
		class={cn(
			'overflow-hidden border-b text-sm transition-[height] duration-300 ease-out',
			isItemOpen ? 'animate-accordion-down' : 'animate-accordion-up',
		)}
		aria-labelledby={ariaLabelledby}
		data-accordion="content"
		{...restProps}
	>
		<div class={cn('px-5 py-[15px]', className)}>
			{@render children?.()}
		</div>
	</div>
{/if}
