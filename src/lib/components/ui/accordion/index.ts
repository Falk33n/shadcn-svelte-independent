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
import AccordionTrigger, {
	type AccordionTriggerProps,
} from './AccordionTrigger.svelte';
import AccordionTriggerBase, {
	type AccordionTriggerBaseAttributes,
	type AccordionTriggerBaseChildProps,
	type AccordionTriggerBaseProps,
	onAccordionItemOpenChange,
	onAccordionKeyboardNavigate,
} from './AccordionTriggerBase.svelte';

export {
	AccordionRoot as Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionIndicator,
	AccordionItem,
	AccordionTrigger,
	AccordionTriggerBase,
	onAccordionItemOpenChange,
	onAccordionKeyboardNavigate,
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
	type AccordionTriggerProps,
};

export type {
	AccordionItemContextProps,
	AccordionRootContextProps,
} from './types';
