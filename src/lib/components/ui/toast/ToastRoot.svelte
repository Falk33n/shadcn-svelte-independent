<script
	lang="ts"
	module
>
	import type { ToastProviderBaseContextProps } from '$components/ui/toast';
	import type { HTMLLIElementReference, ValidateContextProps } from '$types';
	import { cn, validateContext } from '$utils';
	import { onMount, type Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export type ToastRootAttributes = Omit<
		HTMLLiAttributes,
		'aria-atomic' | 'role' | 'tabindex' | 'style'
	>;

	export type ToastRootChildProps = {
		props: ToastRootAttributes & {
			'ref': HTMLLIElementReference;
			'aria-atomic': boolean;
			'role': 'status';
			'tabindex': string;
			'style': string;
		};
	};

	export type ToastRootProps = ToastRootAttributes & {
		ref?: HTMLLIElementReference;
		child?: Snippet<[ToastRootChildProps]>;
	};

	type IsToastVisibleState = { value: boolean };
	type IsHiddenState = { value: boolean };
	type IsSwipeCanceledState = { value: boolean };
	type HasSwipedOutState = { value: boolean };
	type IsSwipeMovingState = { value: boolean };
	type StartXState = { value: number };
	type CurrentXState = { value: number };

	type OnSwipeMoveProps = {
		ref: HTMLLIElementReference;
		isToastVisible: IsToastVisibleState;
		isHidden: IsHiddenState;
		isSwipeMoving: IsSwipeMovingState;
		isSwipeCanceled: IsSwipeCanceledState;
		hasSwipedOut: HasSwipedOutState;
		swipeThreshold: number;
		startX: StartXState;
		currentX: CurrentXState;
	};

	type OnPointerUpProps = {
		ref: HTMLLIElement;
		isSwipeMoving: IsSwipeMovingState;
		isSwipeCanceled: IsSwipeCanceledState;
		hasSwipedOut: HasSwipedOutState;
		isToastVisible: IsToastVisibleState;
		isHidden: IsHiddenState;
		startX: StartXState;
		currentX: CurrentXState;
		swipeThreshold: number;
	};

	type OnPointerDownProps = OnPointerUpProps & {
		e: PointerEvent;
	};

	type OnPointerMoveProps = {
		e: PointerEvent;
		ref: HTMLLIElement;
		currentX: CurrentXState;
		startX: StartXState;
	};

	const style =
		'--toast-swipe-move: 0px; transform: translateX(var(--toast-swipe-move));';

	const providerContextSettings: ValidateContextProps<ToastProviderBaseContextProps> =
		{
			key: 'toast-provider-base-context',
			source: 'ToastProviderBase',
			target: 'ToastRoot',
		};

	let delaySetIsHiddenTimeoutId: NodeJS.Timeout;

	function delaySetIsHidden(
		isToastVisible: IsToastVisibleState,
		isHidden: IsHiddenState,
	) {
		if (!isToastVisible.value) {
			clearTimeout(delaySetIsHiddenTimeoutId);
			delaySetIsHiddenTimeoutId = setTimeout(() => {
				isHidden.value = true;
			}, 200);
		} else {
			isHidden.value = false;
		}
	}

	function onPointerMove({ e, ref, currentX, startX }: OnPointerMoveProps) {
		e.preventDefault();
		currentX.value = e.clientX;

		const deltaX = Math.max(0, currentX.value - startX.value);
		ref.style.setProperty('--toast-swipe-move', `${deltaX}px`);
	}

	let onPointerUpTimeoutId: NodeJS.Timeout;

	function onPointerUp({
		ref,
		currentX,
		startX,
		swipeThreshold,
		isSwipeMoving,
		isSwipeCanceled,
		hasSwipedOut,
		isToastVisible,
		isHidden,
	}: OnPointerUpProps) {
		clearTimeout(onPointerUpTimeoutId);

		const deltaX = currentX.value - startX.value;

		if (deltaX > swipeThreshold) {
			isSwipeMoving.value = false;
			hasSwipedOut.value = true;
			isToastVisible.value = false;
		} else {
			isSwipeCanceled.value = true;

			ref.style.setProperty('--toast-swipe-move', '0px');

			onPointerUpTimeoutId = setTimeout(() => {
				isSwipeCanceled.value = false;
			}, 200);
		}

		ref.removeEventListener('pointermove', (e) => {
			onPointerMove({ e, ref, currentX, startX });
		});

		ref.removeEventListener('pointerup', () => {
			onPointerUp({
				ref,
				swipeThreshold,
				startX,
				currentX,
				isHidden,
				isSwipeMoving,
				isSwipeCanceled,
				hasSwipedOut,
				isToastVisible,
			});
		});
	}

	function onPointerDown({
		e,
		ref,
		currentX,
		startX,
		isSwipeMoving,
		isHidden,
		swipeThreshold,
		isToastVisible,
		hasSwipedOut,
		isSwipeCanceled,
	}: OnPointerDownProps) {
		startX.value = e.clientX;
		currentX.value = startX.value;
		isSwipeMoving.value = true;

		ref.addEventListener('pointermove', (e) => {
			onPointerMove({ e, ref, currentX, startX });
		});

		ref.addEventListener('pointerup', () =>
			onPointerUp({
				ref,
				swipeThreshold,
				startX,
				currentX,
				isHidden,
				isSwipeMoving,
				isSwipeCanceled,
				hasSwipedOut,
				isToastVisible,
			}),
		);
	}

	function onSwipeMove({
		hasSwipedOut,
		isHidden,
		isSwipeCanceled,
		currentX,
		startX,
		isSwipeMoving,
		isToastVisible,
		ref,
		swipeThreshold,
	}: OnSwipeMoveProps) {
		if (!ref) return;

		ref.addEventListener('pointerdown', (e) => {
			onPointerDown({
				e,
				ref,
				currentX,
				startX,
				isSwipeMoving,
				isHidden,
				swipeThreshold,
				isToastVisible,
				hasSwipedOut,
				isSwipeCanceled,
			});
		});
	}
</script>

<script lang="ts">
	const { isToastVisible, swipeThreshold, activeToast } = validateContext(
		providerContextSettings,
	);

	let isSwipeMoving = $state({ value: false });
	let isSwipeCanceled = $state({ value: false });
	let hasSwipedOut = $state({ value: false });
	let isHidden = $state({ value: true });
	let startX = $state({ value: 0 });
	let currentX = $state({ value: 0 });

	let {
		ref = $bindable<HTMLLIElementReference>(null),
		class: className,
		children,
		child,
		...restProps
	}: ToastRootProps = $props();

	const childProps: ToastRootChildProps = {
		props: {
			ref,
			style,
			'role': 'status',
			'tabindex': '-1',
			'aria-atomic': true,
			...restProps,
		},
	};

	onMount(() => {
		onSwipeMove({
			ref,
			currentX,
			startX,
			isToastVisible,
			swipeThreshold,
			isHidden,
			isSwipeMoving,
			isSwipeCanceled,
			hasSwipedOut,
		});
	});

	$effect(() => {
		delaySetIsHidden(isToastVisible, isHidden);
	});
</script>

{#if activeToast.value}
	{#if child}
		{@render child(childProps)}
	{:else}
		<li
			bind:this={ref}
			{style}
			class={cn(
				'ml-auto flex w-full touch-none select-none flex-col items-center gap-x-[15px] rounded-md border bg-background p-[15px] shadow-md transition-transform duration-300 ease-out',
				isToastVisible.value ? 'animate-toast-slide-in' : 'animate-fade-out',
				hasSwipedOut.value && 'animate-toast-slide-out',
				className,
			)}
			aria-atomic={true}
			role="status"
			tabindex="-1"
			{...restProps}
		>
			{@render children?.()}
		</li>
	{/if}
{/if}
