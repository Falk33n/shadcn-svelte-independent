<script lang="ts">
	import type {
		RadioContextProps,
		RadioProviderProps,
	} from '$components/inputs/radio';
	import { setContext } from 'svelte';

	let {
		groupName = 'radio-group',
		children,
		groupValue,
		onGroupValueChange,
	}: RadioProviderProps = $props();

	let value = $state<string>('initial-value');

	function changeGroupValue(newValue: string) {
		value = newValue;
	}

	setContext<RadioContextProps>('radio-wrapper', {
		groupName,
		groupValue: () => groupValue || value,
		onGroupValueChange: (newValue: string) =>
			onGroupValueChange?.(newValue) || changeGroupValue(newValue),
	});
</script>

{@render children()}
