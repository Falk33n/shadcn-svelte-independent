<script
	lang="ts"
	module
>
	import { setAccordionRootContext } from '$components/ui/accordion';
	import type { HTMLDivElementReference } from '$types';
	import { cn, generateID } from '$utils';
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AccordionRootAttributes = Omit<
		HTMLAttributes<HTMLDivElement>,
		'dir'
	>;

	export type AccordionRootChildProps = {
		props: AccordionRootAttributes & {
			'ref': HTMLDivElementReference;
			'dir': 'ltr' | 'rtl';
			'data-accordion': 'root';
		};
	};

	export type AccordionRootProps = AccordionRootAttributes & {
		type: 'single' | 'multiple';
		ref?: HTMLDivElementReference;
		child?: Snippet<[AccordionRootChildProps]>;
		value?: string | string[];
		defaultValue?: string | string[];
		onValueChange?: (value?: string | string[]) => void;
		isCollapsible?: boolean;
		dir?: 'ltr' | 'rtl';
	};

	function validateValues(
		type: 'single' | 'multiple',
		defaultValue?: string | string[],
		value?: string | string[],
	) {
		if (type === 'single') {
			if (Array.isArray(defaultValue)) {
				throw new Error(
					'"defaultValue" must be a string when type is "single"',
				);
			} else if (Array.isArray(value)) {
				throw new Error('"value" must be a string when type is "single"');
			}

			return;
		}

		if (!Array.isArray(defaultValue)) {
			throw new Error(
				'"defaultValue" must be a string[] when type is "multiple"',
			);
		} else if (!Array.isArray(value)) {
			throw new Error('"value" must be a string[] when type is "multiple"');
		}
	}
</script>

<script lang="ts">
	let {
		ref = $bindable<HTMLDivElement | null>(null),
		child,
		children,
		class: className,
		type,
		defaultValue = type === 'multiple' ? [] : undefined,
		value = defaultValue ?? (type === 'multiple' ? [] : undefined),
		onValueChange,
		isCollapsible = true,
		dir = 'ltr',
		...restProps
	}: AccordionRootProps = $props();

	validateValues(type, defaultValue, value);

	let rootValue = $state<string | string[] | undefined>();
	const getRootValue = () => rootValue;
	const setRootValue = (newValue: string | string[] | undefined) =>
		(rootValue = newValue);

	setAccordionRootContext({
		rootType: type,
		isCollapsible,
		rootID: generateID(),
		getRootValue,
		setRootValue,
		onRootValueChange: onValueChange,
	});

	const childProps: AccordionRootChildProps = {
		props: { ref, dir, 'data-accordion': 'root', ...restProps },
	};
</script>

{#if child}
	{@render child(childProps)}
{:else}
	<div
		bind:this={ref}
		{dir}
		class={cn('h-fit w-[300px]', className)}
		data-accordion="root"
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
