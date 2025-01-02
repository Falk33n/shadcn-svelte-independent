<script
	lang="ts"
	module
>
	import { type ToastProviderBaseContextProps } from '$components/ui/toast';
	import type { HTMLOListElementReference, ValidateContextProps } from '$types';
	import { cn, validateContext } from '$utils';
	import { onMount, type Snippet } from 'svelte';
	import type { HTMLOlAttributes } from 'svelte/elements';

	export type ToastViewportAttributes = Omit<
		HTMLOlAttributes,
		'aria-label' | 'role' | 'tabindex' | 'style'
	>;

	export type ToastViewportChildProps = {
		props: ToastViewportAttributes & {
			'ref': HTMLOListElementReference;
			'aria-label': string;
			'role': 'region';
			'tabindex': string;
			'style': string;
		};
	};

	export type ToastViewportProps = ToastViewportAttributes & {
		label?: string;
		ref?: HTMLOListElementReference;
		child?: Snippet<[ToastViewportChildProps]>;
		hotkey?: string[];
	};

	type isToastVisibleState = { value: boolean };

	const providerContextSettings: ValidateContextProps<ToastProviderBaseContextProps> =
		{
			key: 'toast-provider-base-context',
			source: 'ToastProviderBase',
			target: 'ToastViewport',
		};

	const style = '--viewport-padding: 25px; padding: var(--viewport-padding);';

	function onHotkeyPress(
		e: KeyboardEvent,
		ref: HTMLOListElementReference,
		hotkey: string[],
		isToastVisible: isToastVisibleState,
	) {
		if (ref && hotkey.includes(e.key) && isToastVisible.value) {
			e.preventDefault();
			ref.focus();
		}
	}
</script>

<script lang="ts">
	const { isToastVisible, activeToast } = validateContext(
		providerContextSettings,
	);

	let {
		ref = $bindable<HTMLOListElementReference>(null),
		class: className,
		children,
		child,
		hotkey = ['F8'],
		label = `Notifications (${hotkey})`,
		...restProps
	}: ToastViewportProps = $props();

	const childProps: ToastViewportChildProps = {
		props: {
			ref,
			style,
			'aria-label': label,
			'role': 'region',
			'tabindex': '-1',
			...restProps,
		},
	};

	onMount(() => {
		document.addEventListener('keydown', (e) =>
			onHotkeyPress(e, ref, hotkey, isToastVisible),
		);

		return () => {
			document.removeEventListener('keydown', (e) =>
				onHotkeyPress(e, ref, hotkey, isToastVisible),
			);
		};
	});

	$effect(() => {
		if (activeToast.value) {
			const timer = setTimeout(() => {
				activeToast.value = undefined;
			}, activeToast.value.duration);
			return () => clearTimeout(timer);
		}
	});
</script>

{#if child}
	{@render child(childProps)}
{:else}
	<ol
		bind:this={ref}
		{style}
		class={cn(
			'fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 outline-none',
			!isToastVisible.value && 'pointer-events-none',
			className,
		)}
		aria-label={label}
		role="region"
		tabindex="-1"
		{...restProps}
	>
		{@render children?.()}
	</ol>
{/if}
