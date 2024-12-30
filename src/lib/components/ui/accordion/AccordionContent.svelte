<script
	lang="ts"
	module
>
	import {
		type AccordionItemContextProps,
		type AccordionRootContextProps,
	} from '$components/ui/accordion';
	import type { HTMLDivElementReference, ValidateContextProps } from '$types';
	import { cn, validateContext } from '$utils';
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

	type IsItemOpenState = { value: boolean };
	type HiddenState = { value: boolean };
	type RoleState = { value?: 'region' };

	const style =
		'--accordion-content-height: 0px; height: var(--accordion-content-height);';

	const rootContextSettings: ValidateContextProps<AccordionRootContextProps> = {
		key: 'accordion-root-context',
		source: 'AccordionRoot',
		target: 'AccordionContent',
	};

	const itemContextSettings: ValidateContextProps<AccordionItemContextProps> = {
		key: 'accordion-item-context',
		source: 'AccordionItem',
		target: 'AccordionContent',
	};

	function setHeight(ref: HTMLDivElement | null, hidden: HiddenState) {
		if (!ref) return;
		const contentHeight = !hidden.value ? `${ref.scrollHeight}px` : '0px';
		ref.style.setProperty('--accordion-content-height', contentHeight);
	}

	let timeoutId: NodeJS.Timeout;

	function delaySetHidden(isItemOpen: IsItemOpenState, hidden: HiddenState) {
		if (!isItemOpen.value) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				hidden.value = true;
			}, 300);
		} else {
			hidden.value = false;
		}
	}

	function getContentSiblings(ref: HTMLDivElement, role: RoleState) {
		const rootAccordion = ref.closest<HTMLDivElement>(
			'[data-accordion="root"]',
		);

		if (!rootAccordion) {
			role.value = 'region';
			return [];
		}

		return Array.from(
			rootAccordion.querySelectorAll<HTMLDivElement>(
				'[data-accordion="content"]',
			),
		);
	}

	function setRole(
		ref: HTMLDivElement | null,
		role: RoleState,
		rootType: 'single' | 'multiple',
	) {
		if (!ref || rootType === 'single') {
			role.value = 'region';
			return;
		}

		const contents = getContentSiblings(ref, role);

		role.value = contents.length <= 6 ? 'region' : undefined;
	}
</script>

<script lang="ts">
	const { rootType, rootID } = validateContext(rootContextSettings);
	const { itemValue, isItemOpen } = validateContext(itemContextSettings);

	let hidden = $state({ value: true });
	let role = $state<RoleState>({ value: undefined });

	let {
		ref = $bindable<HTMLDivElementReference>(null),
		child,
		children,
		class: className,
		...restProps
	}: AccordionContentProps = $props();

	onMount(() => {
		setRole(ref, role, rootType);
		setHeight(ref, hidden);
		delaySetHidden(isItemOpen, hidden);
	});

	$effect(() => {
		setHeight(ref, hidden);
		delaySetHidden(isItemOpen, hidden);
	});

	const ariaLabelledby = `accordion-trigger-${itemValue}-${rootID}`;
	const id = `accordion-content-${itemValue}-${rootID}`;

	const childProps: AccordionContentChildProps = {
		props: {
			ref,
			id,
			style,
			'role': role.value,
			'aria-labelledby': ariaLabelledby,
			'data-accordion': 'content',
			'hidden': hidden.value,
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
		class={cn(
			'overflow-hidden border-b text-sm transition-[height] duration-300 ease-out',
			isItemOpen.value ? 'animate-accordion-down' : 'animate-accordion-up',
		)}
		aria-labelledby={ariaLabelledby}
		hidden={hidden.value}
		role={role.value}
		data-accordion="content"
		{...restProps}
	>
		<div class={cn('px-5 py-[15px]', className)}>
			{@render children?.()}
		</div>
	</div>
{/if}
