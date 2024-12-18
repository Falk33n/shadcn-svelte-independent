<script lang="ts">
	import { Upload1 } from '$components/icons';
	import type { FileInputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id = 'file',
		name = id ?? 'file',
		'class': className,
		children,
		disabled = false,
		value = $bindable<FileList | null | undefined>(),
		ref = $bindable<HTMLInputElement | null>(null),
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
		'inline-flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm font-medium uppercase text-foreground shadow-sm transition-colors sm:w-[300px] [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50 [&:has(:focus-visible)]:ring-1 [&:has(:focus-visible)]:ring-ring',
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
		bind:files={value}
		{id}
		{name}
		{disabled}
		{...props}
	/>
</label>
