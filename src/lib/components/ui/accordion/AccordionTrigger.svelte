<script
	lang="ts"
	module
>
	import {
		AccordionHeader,
		AccordionIndicator,
		AccordionTriggerBase,
		type AccordionItemContextProps,
		type AccordionRootContextProps,
		type AccordionTriggerBaseProps,
	} from '$components/ui/accordion';
	import type {
		HTMLButtonElementReference,
		ValidateContextProps,
	} from '$types';
	import { cn, validateContext } from '$utils';

	const rootContextSettings: ValidateContextProps<AccordionRootContextProps> = {
		key: 'accordion-root-context',
		source: 'AccordionRoot',
		target: 'AccordionTrigger',
	};

	const itemContextSettings: ValidateContextProps<AccordionItemContextProps> = {
		key: 'accordion-item-context',
		source: 'AccordionItem',
		target: 'AccordionTrigger',
	};
</script>

<script lang="ts">
	validateContext(rootContextSettings);
	validateContext(itemContextSettings);

	let {
		ref = $bindable<HTMLButtonElementReference>(null),
		child,
		children,
		class: className,
		...restProps
	}: AccordionTriggerBaseProps = $props();
</script>

<AccordionHeader>
	<AccordionTriggerBase
		bind:ref
		class={className ? cn(className) : undefined}
		{...restProps}
	>
		{@render children?.()}
		<AccordionIndicator />
	</AccordionTriggerBase>
</AccordionHeader>
