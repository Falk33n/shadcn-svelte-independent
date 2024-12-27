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
		collapsible = true,
		disabled = false,
		readonly = false,
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
		dir,
		'aria-readonly': readonly,
		'aria-disabled': disabled,
		'aria-orientation': orientation,
		'data-accordion': 'root' as const,
	};

	let reactiveValue = $state<string | string[] | undefined>(value);

	function getValue() {
		return reactiveValue;
	}

	setContext<AccordionRootContextProps>('accordion-root-context', {
		type,
		rootValue: getValue(),
		changeValue: (value: string | string[]) => {
			if (collapsible === false) {
				if (Array.isArray(reactiveValue) && typeof value === 'string') {
					if (!reactiveValue.includes(value)) {
						reactiveValue = [...reactiveValue, value];
					}
				} else {
					reactiveValue = value;
				}
			} else {
				if (Array.isArray(reactiveValue) && typeof value === 'string') {
					if (reactiveValue.includes(value)) {
						reactiveValue = reactiveValue.filter((item) => item !== value);
					} else {
						reactiveValue = [...reactiveValue, value];
					}
				} else {
					reactiveValue = value;
				}
			}

			onValueChange?.(value);
		},
		disabled,
		defaultValue,
		onValueChange,
		collapsible,
		orientation,
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
		{dir}
		class={cn(
			'w-[300px] bg-background text-foreground',
			disabled && 'cursor-not-allowed opacity-50',
			readonly && 'opacity-80',
			className,
		)}
		aria-readonly={readonly}
		aria-disabled={disabled}
		aria-orientation={orientation}
		data-accordion="root"
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
