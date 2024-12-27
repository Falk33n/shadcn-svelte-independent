<script lang="ts">
	import type {
		AccordionRootChildProps,
		AccordionRootContextProps,
		AccordionRootProps,
	} from '$components/ui/accordion';
	import { cn, generateID } from '$utils';
	import { setContext } from 'svelte';

	let {
		ref = $bindable<HTMLDivElement | null>(null),
		child,
		children,
		class: className,
		type,
		defaultValue = type === 'multiple' ? [] : undefined,
		value = defaultValue ?? (type === 'multiple' ? [] : undefined),
		onValueChange,
		collapsible = false,
		disabled = false,
		dir = 'ltr',
		orientation = 'vertical',
		...restProps
	}: AccordionRootProps = $props();

	if (type === 'single' && Array.isArray(defaultValue)) {
		throw new Error('"defaultValue" must be a string when type is "single"');
	}

	if (type === 'single' && Array.isArray(value)) {
		throw new Error('"value" must be a string when type is "single"');
	}

	if (type === 'multiple' && !Array.isArray(defaultValue)) {
		throw new Error(
			'"defaultValue" must be a string[] when type is "multiple"',
		);
	}

	if (type === 'multiple' && !Array.isArray(value)) {
		throw new Error('"value" must be a string[] when type is "multiple"');
	}

	const childProps: AccordionRootChildProps = {
		ref,
		'data-orientation': orientation,
		'data-accordion': 'root' as const,
	};

	let reactiveValue = $state<string | string[] | undefined>(value);

	setContext<AccordionRootContextProps>('accordion-root-context', {
		type,
		getValue: () => reactiveValue,
		setValue: (value: string | string[]) => {
			if (Array.isArray(reactiveValue) && typeof value === 'string') {
				if (reactiveValue.includes(value)) {
					reactiveValue = reactiveValue.filter((item) => item !== value);
				} else {
					reactiveValue = [...reactiveValue, value];
				}
			} else {
				reactiveValue = value;
			}

			onValueChange?.(value);
		},
		defaultValue,
		onValueChange,
		collapsible,
		disabled,
		orientation,
		dir,
		uniqueID: generateID(),
	});
</script>

{#if child}
	{@render child({
		props: childProps,
	})}
{:else}
	<div
		bind:this={ref}
		class={cn(
			'w-[275px] rounded-md bg-background text-foreground sm:w-[400px]',
			className,
		)}
		data-orientation={orientation}
		data-accordion={'root' as const}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
