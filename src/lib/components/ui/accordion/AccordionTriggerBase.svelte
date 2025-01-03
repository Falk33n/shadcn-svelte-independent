<script
	lang="ts"
	module
>
	import {
		getAccordionItemContext,
		getAccordionRootContext,
		setAccordionTriggerContext,
		validateAccordionHeaderContext,
	} from '$components/ui/accordion';
	import type { HTMLButtonElementReference } from '$types';
	import { cn } from '$utils';
	import { onMount, type Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type AccordionTriggerBaseAttributes = Omit<
		HTMLButtonAttributes,
		| 'aria-controls'
		| 'id'
		| 'type'
		| 'aria-expanded'
		| 'aria-disabled'
		| 'tabindex'
	>;

	export type AccordionTriggerBaseChildProps = {
		props: AccordionTriggerBaseAttributes & {
			'ref': HTMLButtonElementReference;
			'aria-controls': string;
			'aria-expanded': boolean;
			'aria-disabled': boolean;
			'disabled': boolean;
			'tabindex': 0;
			'id': string;
			'data-accordion': 'trigger';
		};
	};

	export type AccordionTriggerBaseProps = AccordionTriggerBaseAttributes & {
		ref?: HTMLButtonElementReference;
		child?: Snippet<[AccordionTriggerBaseChildProps]>;
	};

	type onAccordionItemOpenChangeProps = {
		rootType: 'single' | 'multiple';
		isCollapsible: boolean;
		itemValue: string;
		rootValue: string | string[] | undefined;
		setRootValue: (newValue: string | string[] | undefined) => void;
		onRootValueChange?: (newValue: string | string[]) => void;
	};

	type AccordionKeyboardEvent = KeyboardEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	};

	const source = 'AccordionTriggerBase';

	function handleSingleItemOpenChange(
		rootValue: string | string[] | undefined,
		setRootValue: (newValue: string | string[] | undefined) => void,
		itemValue: string,
		isCollapsible: boolean,
	) {
		setRootValue(
			isCollapsible
				? rootValue === itemValue
					? undefined
					: itemValue
				: rootValue !== itemValue
					? itemValue
					: rootValue,
		);
	}

	function handleMultipleItemsOpenChange(
		rootValue: string | string[] | undefined,
		setRootValue: (newValue: string | string[] | undefined) => void,
		itemValue: string,
		isCollapsible: boolean,
	) {
		if (Array.isArray(rootValue)) {
			setRootValue(
				isCollapsible
					? rootValue.includes(itemValue)
						? rootValue.filter((val) => val !== itemValue)
						: [...rootValue, itemValue]
					: !rootValue.includes(itemValue)
						? [...rootValue, itemValue]
						: rootValue,
			);
		}
	}

	function onAccordionItemOpenChange({
		rootType,
		isCollapsible,
		rootValue,
		setRootValue,
		itemValue,
		onRootValueChange,
	}: onAccordionItemOpenChangeProps) {
		if (rootType === 'single') {
			handleSingleItemOpenChange(
				rootValue,
				setRootValue,
				itemValue,
				isCollapsible,
			);
		} else {
			handleMultipleItemsOpenChange(
				rootValue,
				setRootValue,
				itemValue,
				isCollapsible,
			);
		}

		if (rootValue) {
			onRootValueChange?.(rootValue);
		}
	}

	function getSiblingTriggers(ref: HTMLButtonElement) {
		const root = ref.closest<HTMLDivElement>('[data-accordion="root"]');
		if (!root) return null;

		const triggers = Array.from(
			root.querySelectorAll<HTMLButtonElement>('[data-accordion="trigger"]'),
		);

		return triggers.length > 0 ? triggers : null;
	}

	function handleKeyboardNavigation(
		e: AccordionKeyboardEvent,
		triggers: HTMLButtonElement[],
	) {
		const currentIndex = triggers.indexOf(e.currentTarget);

		if (e.key === 'ArrowDown') {
			const nextIndex = (currentIndex + 1) % triggers.length;
			triggers[nextIndex].focus();
		} else if (e.key === 'ArrowUp') {
			const prevIndex = (currentIndex - 1 + triggers.length) % triggers.length;
			triggers[prevIndex].focus();
		} else if (e.key === 'Home') {
			triggers[0].focus();
		} else if (e.key === 'End') {
			triggers[triggers.length - 1].focus();
		}
	}

	function onAccordionKeyboardNavigate(
		e: AccordionKeyboardEvent,
		ref: HTMLButtonElementReference,
	) {
		if (
			(e.key !== 'ArrowDown' &&
				e.key !== 'ArrowUp' &&
				e.key !== 'Home' &&
				e.key !== 'End') ||
			!ref
		) {
			return;
		}

		e.preventDefault();

		const triggers = getSiblingTriggers(ref);
		if (!triggers) return;

		handleKeyboardNavigation(e, triggers);
	}
</script>

<script lang="ts">
	const {
		isCollapsible,
		rootID,
		rootType,
		getRootValue,
		setRootValue,
		onRootValueChange,
	} = getAccordionRootContext(source);
	const { getIsItemOpen, itemValue } = getAccordionItemContext(source);
	validateAccordionHeaderContext(source);
	setAccordionTriggerContext();

	let {
		ref = $bindable<HTMLButtonElementReference>(null),
		child,
		children,
		class: className,
		disabled,
		...restProps
	}: AccordionTriggerBaseProps = $props();

	const rootValue = $derived(getRootValue());
	const isItemOpen = $derived(getIsItemOpen());

	const ariaDisabled = $derived(isItemOpen && !isCollapsible);
	const getAriaDisabled = () => ariaDisabled;

	onMount(() => {
		if (!ref) return;

		ref.addEventListener('keydown', (e) =>
			onAccordionKeyboardNavigate(e as AccordionKeyboardEvent, ref),
		);

		ref.addEventListener('click', () =>
			onAccordionItemOpenChange({
				isCollapsible,
				itemValue,
				rootType,
				rootValue,
				setRootValue,
				onRootValueChange,
			}),
		);
	});

	const id = `accordion-trigger-${itemValue}-${rootID}`;
	const ariaControls = `accordion-content-${itemValue}-${rootID}`;
	const childProps: AccordionTriggerBaseChildProps = {
		props: {
			ref,
			id,
			'aria-controls': ariaControls,
			'aria-expanded': getIsItemOpen(),
			'aria-disabled': getAriaDisabled(),
			'disabled': disabled === true,
			'tabindex': 0,
			'data-accordion': 'trigger',
			...restProps,
		},
	};
</script>

{#if child}
	{@render child(childProps)}
{:else}
	<button
		bind:this={ref}
		{disabled}
		{id}
		class={cn(
			'flex h-[45px] flex-1 items-center justify-between border-b px-5 font-medium leading-none outline-none transition-colors hover:underline focus-visible:ring-1 focus-visible:ring-ring',
			disabled && 'cursor-not-allowed opacity-50',
			className,
		)}
		type="button"
		tabindex={0}
		aria-expanded={isItemOpen}
		aria-disabled={ariaDisabled}
		aria-controls={ariaControls}
		data-accordion="trigger"
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
