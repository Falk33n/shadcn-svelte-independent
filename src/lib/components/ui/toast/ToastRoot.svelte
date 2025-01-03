<script
	lang="ts"
	module
>
	import {
		activeToast,
		toastQueue,
		type ToastProps,
		type ToastProviderBaseContextProps,
	} from '$components/ui/toast';
	import type {
		EmptyContext,
		HTMLLIElementReference,
		ValidateContextProps,
	} from '$types';
	import { cn, validateContext } from '$utils';
	import { setContext, type Snippet } from 'svelte';
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
	type IsSwipeCanceledState = { value: boolean };
	type HasSwipedOutState = { value: boolean };
	type IsSwipeMovingState = { value: boolean };
	type StartXState = { value: number };
	type CurrentXState = { value: number };

	type OnSwipeMoveProps = {
		ref: HTMLLIElementReference;
		isToastVisible: IsToastVisibleState;
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

	const providerBaseContextSettings: ValidateContextProps<ToastProviderBaseContextProps> =
		{
			key: 'toast-provider-base-context',
			source: 'ToastProviderBase',
			target: 'ToastRoot',
		};

	const viewportContextSettings: ValidateContextProps<EmptyContext> = {
		key: 'toast-viewport-context',
		source: 'ToastViewport',
		target: 'ToastRoot',
	};

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
	}: OnPointerUpProps) {
		clearTimeout(onPointerUpTimeoutId);

		if (currentX.value - startX.value > swipeThreshold) {
			isSwipeMoving.value = false;
			isToastVisible.value = false;
			hasSwipedOut.value = true;

			onPointerUpTimeoutId = setTimeout(() => {
				toastQueue.value.shift();
				hasSwipedOut.value = false;
			}, 300);
		} else {
			isSwipeCanceled.value = true;
			ref.style.setProperty('--toast-swipe-move', '0px');

			onPointerUpTimeoutId = setTimeout(() => {
				isSwipeCanceled.value = false;
			}, 300);
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
				isSwipeMoving,
				isSwipeCanceled,
				hasSwipedOut,
				isToastVisible,
			}),
		);
	}

	let toastRemovalId: NodeJS.Timeout;

	function onToastRemoval(
		activeToast: { value?: ToastProps },
		isToastVisible: IsToastVisibleState,
		toastDuration: number = 5000,
	) {
		if (activeToast.value) {
			clearTimeout(toastRemovalId);
			toastRemovalId = setTimeout(() => {
				isToastVisible.value = false;
				setTimeout(() => {
					toastQueue.value.shift();
				}, 300);
			}, toastDuration);
		}
	}

	let onMultipleTimeoutId: NodeJS.Timeout;

	function onMultipleToast(
		isToastVisible: IsToastVisibleState,
		hasSwipedOut: HasSwipedOutState,
	) {
		clearTimeout(onMultipleTimeoutId);

		isToastVisible.value = false;
		hasSwipedOut.value = true;

		onMultipleTimeoutId = setTimeout(() => {
			toastQueue.value.shift();
			hasSwipedOut.value = false;
		}, 50);
	}

	function onSwipeMove({
		hasSwipedOut,
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
				swipeThreshold,
				isToastVisible,
				hasSwipedOut,
				isSwipeCanceled,
			});
		});
	}
</script>

<script lang="ts">
	const { isToastVisible, swipeThreshold } = validateContext(
		providerBaseContextSettings,
	);
	validateContext(viewportContextSettings);

	let isSwipeMoving = $state({ value: false });
	let isSwipeCanceled = $state({ value: false });
	let hasSwipedOut = $state({ value: false });
	let startX = $state({ value: 0 });
	let currentX = $state({ value: 0 });

	let {
		ref = $bindable<HTMLLIElementReference>(null),
		class: className,
		children,
		child,
		...restProps
	}: ToastRootProps = $props();

	setContext<EmptyContext>('toast-root-context', {});

	$effect(() => {
		if (toastQueue.value.length > 1) {
			onMultipleToast(isToastVisible, hasSwipedOut);
		}
	});

	$effect(() => {
		if (activeToast.value) {
			onToastRemoval(activeToast, isToastVisible, activeToast.value.duration);

			onSwipeMove({
				ref,
				currentX,
				startX,
				isToastVisible,
				swipeThreshold,
				isSwipeMoving,
				isSwipeCanceled,
				hasSwipedOut,
			});
		}
	});

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
				isToastVisible.value
					? 'animate-toast-slide-in'
					: hasSwipedOut.value
						? 'animate-toast-slide-out'
						: 'animate-fade-out',
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
