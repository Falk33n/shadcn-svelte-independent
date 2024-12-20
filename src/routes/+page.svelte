<script>
	import {
		Checkbox,
		FileInput,
		NumberInput,
		TextInput,
	} from '$components/inputs';
	import {
		RadioFieldset,
		RadioInput,
		RadioLabel,
		RadioLegend,
		RadioProvider,
	} from '$components/inputs/radio';
</script>

<div class="flex w-full flex-col gap-8 p-4">
	<TextInput id="name" />
	<Checkbox id="agree" />
	<FileInput id="file-upload" />
	<NumberInput id="number" />

	<RadioProvider groupName="radios">
		<RadioFieldset>
			<RadioLegend srOnly>Radio Group</RadioLegend>

			<RadioLabel>
				<RadioInput id="radio-1" />
				Hello I am trying out my Radio component.
			</RadioLabel>

			<RadioLabel>
				<RadioInput id="radio-2" />
			</RadioLabel>

			<RadioLabel>
				<RadioInput id="radio-3" />
			</RadioLabel>

			<RadioLabel>
				<RadioInput id="radio-4" />
			</RadioLabel>
		</RadioFieldset>
	</RadioProvider>
</div>
