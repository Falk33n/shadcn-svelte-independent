<script lang="ts">
	import type {
		RadioContextProps,
		RadioInputProps,
	} from '$components/inputs/radio';
	import { cn } from '$utils';
	import { getContext, onMount } from 'svelte';

	const { groupName, groupValue, onGroupValueChange }: RadioContextProps =
		getContext('radio-wrapper');

	let {
		id = 'radio',
		class: className,
		defaultChecked,
		value,
		ref = $bindable<HTMLInputElement | null>(null),
		autocomplete = 'off',
		...props
	}: RadioInputProps = $props();

	onMount(() => {
		if (defaultChecked) {
			onGroupValueChange('default-value');
			value = groupValue();
		}
	});
</script>

<input
	class={cn(
		'mt-1 aspect-square size-4 appearance-none rounded-full border border-primary shadow-sm checked:bg-primary checked:ring-1 checked:ring-ring checked:ring-offset-1 checked:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50',
		className,
	)}
	onchange={(e) => onGroupValueChange(e.currentTarget.value)}
	type="radio"
	name={groupName}
	aria-checked={groupValue() === value}
	checked={groupValue() === value}
	aria-live="polite"
	bind:this={ref}
	{value}
	{autocomplete}
	{id}
	{...props}
/>
