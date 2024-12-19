<script lang="ts">
	import { Upload } from '$components/icons';
	import type { FileInputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id = 'file',
		name = id ?? 'file',
		class: className,
		children,
		disabled = false,
		files = $bindable<FileList | null | undefined>(),
		ref = $bindable<HTMLInputElement | null>(null),
		autocomplete = 'off',
		onFileChange,
		...props
	}: FileInputProps = $props();

	function changeFile(newFile: FileList | null) {
		if (newFile) {
			files = newFile;
			onFileChange?.(newFile);
		}
	}
</script>

<label
	class={cn(
		'inline-flex h-9 w-full cursor-pointer items-center gap-2 truncate rounded-md border border-input bg-transparent px-3 py-1 text-sm font-medium uppercase text-foreground shadow-sm transition-colors sm:w-[250px] [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50 [&:has(:focus-visible)]:ring-1 [&:has(:focus-visible)]:ring-ring',
		className,
	)}
>
	{#if children}
		{@render children()}
	{:else}
		<Upload class="size-4 scale-150 [&>path]:fill-foreground" />
		Choose file
		<span class="ml-2 text-xs">
			{#if !files || files.length === 0}
				No file chosen
			{:else if files.length > 1}
				{files.length} files selected
			{:else}
				{files[0].name}
			{/if}
		</span>
	{/if}

	<input
		type="file"
		class="sr-only"
		onchange={(e) => changeFile(e.currentTarget.files)}
		multiple
		aria-disabled={disabled}
		bind:this={ref}
		bind:files
		{autocomplete}
		{id}
		{name}
		{disabled}
		{...props}
	/>
</label>
