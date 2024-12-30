<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger,
	} from '$components/ui/accordion';
</script>

<div class="flex h-screen w-full justify-center gap-8 p-4">
	<Accordion type="single">
		<AccordionItem value="item-1">
			<AccordionTrigger>Trigger1</AccordionTrigger>
			<AccordionContent><p>This is the content</p></AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-2">
			<AccordionTrigger>Trigger2</AccordionTrigger>
			<AccordionContent><p>This is the content</p></AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-3">
			<AccordionTrigger>Trigger3</AccordionTrigger>
			<AccordionContent><p>This is the content</p></AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-4">
			<AccordionTrigger>Trigger3</AccordionTrigger>
			<AccordionContent><p>This is the content</p></AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-5">
			<AccordionTrigger>Trigger3</AccordionTrigger>
			<AccordionContent><p>This is the content</p></AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-6">
			<AccordionTrigger>Trigger3</AccordionTrigger>
			<AccordionContent><p>This is the content</p></AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-7">
			<AccordionTrigger>Trigger3</AccordionTrigger>
			<AccordionContent><p>This is the content</p></AccordionContent>
		</AccordionItem>
	</Accordion>
</div>
