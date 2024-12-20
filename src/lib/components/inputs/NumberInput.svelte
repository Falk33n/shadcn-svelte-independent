<script lang="ts">
	import { ChevronUp } from '$components/icons';
	import type {
		NumberInputProps,
		NumberKeyboardEvent,
	} from '$components/inputs';
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

	function startKeyboardValueChange(
		e: NumberKeyboardEvent,
		stepAmount: number,
	) {
		if (e.key !== ' ' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
		changeValue(value ?? (defaultValue ?? 0) + stepAmount);
	}
</script>

<div
	class={cn(
		'group flex h-9 w-full overflow-hidden rounded-md border border-input bg-transparent pr-3 shadow-sm transition-colors [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50 [&:has(:focus-visible)]:ring-1 [&:has(:focus-visible)]:ring-ring',
		className,
	)}
>
	<input
		class="size-full rounded-md border-0 px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
		type="number"
		aria-disabled={disabled}
		aria-describedby={`number-description-${id}`}
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

	<span
		id={`number-description-${id}`}
		class="sr-only"
	>
		Use the buttons or type to adjust the value. Minimum is {min}, maximum is {max},
		and step size is {step}.
	</span>

	<div class="hidden flex-col justify-center group-focus-within:flex">
		<button
			class="rounded-md px-1 pb-0 pt-0.5 transition-colors hover:bg-primary/10 focus-visible:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			aria-label={`Increment by ${step}`}
			aria-disabled={disabled}
			aria-controls={id}
			type="button"
			onmousedown={() => startValueChange(step)}
			onmouseup={stopValueChange}
			onmouseleave={stopValueChange}
			ontouchstart={() => startValueChange(step)}
			ontouchend={stopValueChange}
			onkeydown={(e) => startKeyboardValueChange(e, step)}
			{disabled}
		>
			<ChevronUp class="size-3.5 scale-150 [&>path]:fill-foreground" />
		</button>

		<button
			class="rounded-md px-1 pb-0.5 pt-0 transition-colors hover:bg-primary/10 focus-visible:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			aria-label={`Decrement by ${step}`}
			aria-disabled={disabled}
			aria-controls={id}
			type="button"
			onmousedown={() => startValueChange(-step)}
			onmouseup={stopValueChange}
			onmouseleave={stopValueChange}
			ontouchstart={() => startValueChange(-step)}
			ontouchend={stopValueChange}
			onkeydown={(e) => startKeyboardValueChange(e, -step)}
			{disabled}
		>
			<ChevronUp
				class="size-3.5 rotate-180 scale-150 [&>path]:fill-foreground"
			/>
		</button>
	</div>
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
