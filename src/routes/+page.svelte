<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
	} from '../lib/components/ui/accordion';
	import AccordionContent from '../lib/components/ui/accordion/AccordionContent.svelte';
</script>

<div class="flex h-screen w-full justify-center gap-8 p-4">
	<Accordion type="multiple">
		<AccordionItem value="item-1">
			<AccordionTrigger>Trigger1</AccordionTrigger>
			<AccordionContent>This is the content</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-2">
			<AccordionTrigger>Trigger2</AccordionTrigger>
			<AccordionContent>This is the content</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-3">
			<AccordionTrigger>Trigger3</AccordionTrigger>
			<AccordionContent>This is the content</AccordionContent>
		</AccordionItem>
	</Accordion>
</div>
