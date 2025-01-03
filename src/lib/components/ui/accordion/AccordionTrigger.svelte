<script
	lang="ts"
	module
>
	import {
		AccordionHeader,
		AccordionIndicator,
		AccordionTriggerBase,
		validateAccordionItemContext,
		validateAccordionRootContext,
		type AccordionTriggerBaseProps,
	} from '$components/ui/accordion';
	import type { HTMLButtonElementReference } from '$types';
	import { cn } from '$utils';

	const source = 'AccordionTrigger';
</script>

<script lang="ts">
	validateAccordionRootContext(source);
	validateAccordionItemContext(source);

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
