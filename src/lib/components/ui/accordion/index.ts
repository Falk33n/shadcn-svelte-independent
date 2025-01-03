import AccordionContent, {
	type AccordionContentAttributes,
	type AccordionContentChildProps,
	type AccordionContentProps,
} from './AccordionContent.svelte';
import AccordionHeader, {
	type AccordionHeaderAttributes,
	type AccordionHeaderChildProps,
	type AccordionHeaderProps,
} from './AccordionHeader.svelte';
import AccordionIndicator, {
	type AccordionIndicatorAttributes,
	type AccordionIndicatorChildProps,
	type AccordionIndicatorProps,
} from './AccordionIndicator.svelte';
import AccordionItem, {
	type AccordionItemChildProps,
	type AccordionItemProps,
} from './AccordionItem.svelte';
import AccordionRoot, {
	type AccordionRootAttributes,
	type AccordionRootChildProps,
	type AccordionRootProps,
} from './AccordionRoot.svelte';
import AccordionTrigger from './AccordionTrigger.svelte';
import AccordionTriggerBase, {
	type AccordionTriggerBaseAttributes,
	type AccordionTriggerBaseChildProps,
	type AccordionTriggerBaseProps,
} from './AccordionTriggerBase.svelte';

export {
	getAccordionItemContext,
	getAccordionRootContext,
	setAccordionHeaderContext,
	setAccordionItemContext,
	setAccordionRootContext,
	setAccordionTriggerContext,
	validateAccordionHeaderContext,
	validateAccordionItemContext,
	validateAccordionRootContext,
	validateAccordionTriggerContext,
	type AccordionItemContextProps,
	type AccordionRootContextProps,
} from './context';

export {
	AccordionRoot as Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionIndicator,
	AccordionItem,
	AccordionTrigger,
	AccordionTriggerBase,
	type AccordionContentAttributes,
	type AccordionContentChildProps,
	type AccordionContentProps,
	type AccordionHeaderAttributes,
	type AccordionHeaderChildProps,
	type AccordionHeaderProps,
	type AccordionIndicatorAttributes,
	type AccordionIndicatorChildProps,
	type AccordionIndicatorProps,
	type AccordionItemChildProps,
	type AccordionItemProps,
	type AccordionRootAttributes,
	type AccordionRootChildProps,
	type AccordionRootProps,
	type AccordionTriggerBaseAttributes,
	type AccordionTriggerBaseChildProps,
	type AccordionTriggerBaseProps,
};
