<script>
	import { FileInput, NumberInput, TextInput } from '$components/inputs';
	import { CheckboxInput, CheckboxLabel } from '$components/inputs/checkbox';
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
	<FileInput id="file-upload" />
	<NumberInput id="number" />

	<CheckboxLabel>
		<CheckboxInput id="agree" />
		Hello I am trying out my Radio component.
	</CheckboxLabel>

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
