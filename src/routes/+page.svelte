<script lang="ts">
	import { Accordion, AccordionItem } from '../lib/components/ui/accordion';
	import AccordionContent from '../lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionTrigger from '../lib/components/ui/accordion/AccordionTrigger.svelte';

	/* const { activeToast, showToast } = getToastProviderBaseContext('HomePage');

	let click = $state(0); */
</script>

<div class="flex h-screen w-full justify-center gap-8 p-4">
	<!-- <button
		onclick={() => {
			click += 1;
			showToast(activeToast, click === 1 ? 'title' : 'other', 'okokokok');
		}}
	>
		click
	</button> -->

	<Accordion type="single">
		<AccordionItem value="item-1">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent
				>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent
			>
		</AccordionItem>
		<AccordionItem value="item-2">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent
				>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent
			>
		</AccordionItem>
		<AccordionItem value="item-3">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent
				>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent
			>
		</AccordionItem>
		<AccordionItem value="item-4">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent
				>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent
			>
		</AccordionItem>
		<AccordionItem value="item-5">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent
				>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent
			>
		</AccordionItem>
	</Accordion>
</div>
