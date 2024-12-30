<script
	lang="ts"
	module
>
	import {
		type AccordionItemContextProps,
		type AccordionRootContextProps,
	} from '$components/ui/accordion';
	import type {
		EmptyContext,
		HTMLButtonElementReference,
		ValidateContextProps,
	} from '$types';
	import { cn, validateContext } from '$utils';
	import { setContext, type Snippet } from 'svelte';
	import type {
		HTMLButtonAttributes,
		KeyboardEventHandler,
		MouseEventHandler,
	} from 'svelte/elements';

	export type AccordionTriggerBaseAttributes = Omit<
		HTMLButtonAttributes,
		| 'aria-controls'
		| 'id'
		| 'type'
		| 'aria-expanded'
		| 'aria-disabled'
		| 'tabindex'
		| 'onclick'
		| 'onkeydown'
	>;

	export type AccordionTriggerBaseChildProps = {
		props: AccordionTriggerBaseAttributes & {
			'ref': HTMLButtonElementReference;
			'onkeydown': KeyboardEventHandler<HTMLButtonElement> | null;
			'onclick': MouseEventHandler<HTMLButtonElement> | null;
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

	type RootValueState = { value?: string | string[] };

	type onAccordionItemOpenChangeProps = {
		rootType: 'single' | 'multiple';
		isCollapsible: boolean;
		rootValue: RootValueState;
		itemValue: string;
		rootOnValueChange?: (newValue: string | string[]) => void;
	};

	type AccordionKeyboardEvent = KeyboardEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	};

	const rootContextSettings: ValidateContextProps<AccordionRootContextProps> = {
		key: 'accordion-root-context',
		source: 'AccordionRoot',
		target: 'AccordionTriggerBase',
	};

	const itemContextSettings: ValidateContextProps<AccordionItemContextProps> = {
		key: 'accordion-item-context',
		source: 'AccordionItem',
		target: 'AccordionTriggerBase',
	};

	const headerContextSettings: ValidateContextProps<EmptyContext> = {
		key: 'accordion-header-context',
		source: 'AccordionHeader',
		target: 'AccordionTriggerBase',
	};

	function handleSingleItemOpenChange(
		rootValue: RootValueState,
		itemValue: string,
		isCollapsible: boolean,
	) {
		rootValue.value = isCollapsible
			? rootValue.value === itemValue
				? undefined
				: itemValue
			: rootValue.value !== itemValue
				? itemValue
				: rootValue.value;
	}

	function handleMultipleItemsOpenChange(
		rootValue: RootValueState,
		itemValue: string,
		isCollapsible: boolean,
	) {
		if (Array.isArray(rootValue.value)) {
			rootValue.value = isCollapsible
				? rootValue.value.includes(itemValue)
					? rootValue.value.filter((val) => val !== itemValue)
					: [...rootValue.value, itemValue]
				: !rootValue.value.includes(itemValue)
					? [...rootValue.value, itemValue]
					: rootValue.value;
		}
	}

	export function onAccordionItemOpenChange({
		rootType,
		isCollapsible,
		rootValue,
		itemValue,
		rootOnValueChange,
	}: onAccordionItemOpenChangeProps) {
		if (rootType === 'single') {
			handleSingleItemOpenChange(rootValue, itemValue, isCollapsible);
		} else {
			handleMultipleItemsOpenChange(rootValue, itemValue, isCollapsible);
		}

		if (rootValue.value) {
			rootOnValueChange?.(rootValue.value);
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

	export function onAccordionKeyboardNavigate(
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
	const { isCollapsible, rootID, rootType, rootValue, rootOnValueChange } =
		validateContext(rootContextSettings);
	const { isItemOpen, itemValue } = validateContext(itemContextSettings);
	validateContext(headerContextSettings);

	let ariaDisabled = $state({ value: false });

	let {
		ref = $bindable<HTMLButtonElementReference>(null),
		child,
		children,
		class: className,
		disabled,
		...restProps
	}: AccordionTriggerBaseProps = $props();

	setContext<EmptyContext>('accordion-trigger-base-context', {});

	$effect(() => {
		ariaDisabled.value = isItemOpen.value && !isCollapsible;
	});

	const id = `accordion-trigger-${itemValue}-${rootID}`;
	const ariaControls = `accordion-content-${itemValue}-${rootID}`;

	const childProps: AccordionTriggerBaseChildProps = {
		props: {
			ref,
			id,
			'onclick': () =>
				onAccordionItemOpenChange({
					isCollapsible,
					itemValue,
					rootType,
					rootValue,
					rootOnValueChange,
				}),
			'onkeydown': (e) => onAccordionKeyboardNavigate(e, ref),
			'aria-controls': ariaControls,
			'aria-expanded': isItemOpen.value,
			'aria-disabled': ariaDisabled.value,
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
		onclick={() =>
			onAccordionItemOpenChange({
				isCollapsible,
				itemValue,
				rootType,
				rootValue,
				rootOnValueChange,
			})}
		onkeydown={(e) => onAccordionKeyboardNavigate(e, ref)}
		class={cn(
			'flex h-[45px] flex-1 items-center justify-between border-b px-5 font-medium leading-none outline-none transition-colors hover:underline focus-visible:ring-1 focus-visible:ring-ring',
			disabled && 'cursor-not-allowed opacity-50',
			className,
		)}
		type="button"
		tabindex={0}
		aria-expanded={isItemOpen.value}
		aria-disabled={ariaDisabled.value}
		aria-controls={ariaControls}
		data-accordion="trigger"
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
