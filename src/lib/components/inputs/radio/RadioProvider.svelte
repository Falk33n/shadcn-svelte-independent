<script lang="ts">
	import type {
		RadioContextProps,
		RadioProviderProps,
	} from '$components/inputs/radio';
	import { setContext } from 'svelte';

	let { groupName = 'radio-group', children }: RadioProviderProps = $props();

	let groupValue = $state<string>('initial-value');

	function onGroupValueChange(newValue: string) {
		groupValue = newValue;
	}

	setContext<RadioContextProps>('radio-wrapper', {
		groupName,
		groupValue: () => groupValue,
		onGroupValueChange: (newValue: string) => onGroupValueChange(newValue),
	});
</script>

{@render children()}
