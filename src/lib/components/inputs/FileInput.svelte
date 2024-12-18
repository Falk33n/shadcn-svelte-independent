<script lang="ts">
	import { Upload1 } from '$components/icons';
	import type { FileInputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id,
		name = id,
		'class': className,
		children,
		disabled = false,
		value = null,
		ref = $bindable(null),
		'aria-disabled': ariaDisabled = false,
		onFileChange,
		...props
	}: FileInputProps = $props();

	function changeFile(newFile: FileList | null) {
		if (newFile) {
			value = newFile;
			onFileChange?.(newFile);
		}
	}
</script>

<label
	class={cn(
		'inline-flex h-9 w-fit items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm font-medium uppercase text-foreground shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
		disabled && 'cursor-not-allowed opacity-50',
		className,
	)}
>
	{#if children}
		{@render children()}
	{:else}
		<Upload1 class="size-4 scale-125 [&>path]:fill-foreground" />
		Choose file
		<span class="ml-2 text-xs">
			{#if !value || value.length === 0}
				No file chosen
			{:else if value.length > 1}
				{value.length} files selected
			{:else}
				{value[0].name}
			{/if}
		</span>
	{/if}

	<input
		type="file"
		class="sr-only"
		onchange={(e) => changeFile(e.currentTarget.files)}
		multiple
		aria-disabled={ariaDisabled || disabled}
		bind:this={ref}
		{id}
		{name}
		{disabled}
		{...props}
	/>
</label>
