<script lang="ts">
	import { ChevronUp } from '$components/icons';
	import type { NumberInputProps } from '$components/inputs';
	import { cn } from '$utils';

	let {
		id = 'number',
		name = id ?? 'number',
		class: className,
		ref = $bindable<HTMLInputElement | null>(null),
		autocomplete = 'off',
		step = 1,
		min = -Infinity,
		max = Infinity,
		defaultValue,
		value = $bindable<number | undefined>(defaultValue ?? undefined),
		disabled = false,
		onNumberChange,
		...props
	}: NumberInputProps = $props();

	function changeValue(newValue: number) {
		if (newValue > max) newValue = max;
		else if (newValue < min) newValue = min;
		value = newValue;
		onNumberChange?.(newValue);
	}

	let intervalId: NodeJS.Timeout | undefined;

	function startValueChange(stepAmount: number) {
		changeValue((value ?? defaultValue ?? 0) + stepAmount);

		intervalId = setInterval(() => {
			changeValue((value ?? defaultValue ?? 0) + stepAmount);
		}, 50);
	}

	function stopValueChange() {
		clearInterval(intervalId);
		intervalId = undefined;
	}
</script>

<div
	class={cn(
		'flex h-10 w-full overflow-hidden rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50 [&:has(:focus-visible)]:ring-1 [&:has(:focus-visible)]:ring-ring',
		className,
	)}
>
	<input
		class="size-full rounded-md border-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
		type="number"
		aria-disabled={disabled}
		onchange={(e) => changeValue(parseFloat(e.currentTarget.value))}
		aria-live="polite"
		aria-valuenow={value ?? defaultValue ?? 0}
		aria-valuemin={min}
		aria-valuemax={max}
		bind:this={ref}
		bind:value
		{defaultValue}
		{autocomplete}
		{step}
		{min}
		{max}
		{disabled}
		{id}
		{name}
		{...props}
	/>

	<span class="ml-3 flex flex-col justify-center">
		<button
			class="rounded-md p-0.5 pb-0 transition-colors hover:bg-primary/10 focus-visible:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			aria-label="Increment"
			aria-disabled={disabled}
			aria-controls={id}
			onmousedown={() => startValueChange(step)}
			onmouseup={stopValueChange}
			onmouseleave={stopValueChange}
			ontouchstart={() => startValueChange(step)}
			ontouchend={stopValueChange}
			{disabled}
		>
			<ChevronUp class="size-3.5 scale-150 [&>path]:fill-foreground" />
		</button>

		<button
			class="rounded-md p-0.5 pt-0 transition-colors hover:bg-primary/10 focus-visible:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			aria-label="Decrement"
			aria-disabled={disabled}
			aria-controls={id}
			onmousedown={() => startValueChange(-step)}
			onmouseup={stopValueChange}
			onmouseleave={stopValueChange}
			ontouchstart={() => startValueChange(-step)}
			ontouchend={stopValueChange}
			{disabled}
		>
			<ChevronUp
				class="size-3.5 rotate-180 scale-150 [&>path]:fill-foreground"
			/>
		</button>
	</span>
</div>

<style>
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
</style>
