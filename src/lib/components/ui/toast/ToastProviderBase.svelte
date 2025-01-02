<script
	lang="ts"
	module
>
	import type {
		ToastProps,
		ToastProviderBaseContextProps,
	} from '$components/ui/toast';
	import { setContext, type Snippet } from 'svelte';

	export type ToastProviderBaseProps = {
		label: string;
		children?: Snippet<[]>;
		duration?: number;
		swipeThreshold?: number;
	};

	function showToast(
		activeToast: { value?: ToastProps },
		title: string,
		content: string,
		duration: number = 5000,
	) {
		activeToast.value = {
			id: crypto.randomUUID(),
			title,
			content,
			duration,
		};
	}
</script>

<script lang="ts">
	let {
		children,
		duration = 5000,
		label = 'Notification',
		swipeThreshold = 50,
	}: ToastProviderBaseProps = $props();

	let isToastVisible = $state({ value: false });
	let activeToast = $state<{ value?: ToastProps }>({});

	setContext<ToastProviderBaseContextProps>('toast-provider-base-context', {
		activeToast,
		isToastVisible,
		label,
		duration,
		swipeThreshold,
		showToast,
	});

	$effect(() => {
		if (activeToast.value && !isToastVisible.value) {
			isToastVisible.value = true;
		}
	});
</script>

{@render children?.()}
