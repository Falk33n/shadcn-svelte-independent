<script
	lang="ts"
	module
>
	import {
		activeToast,
		type ToastProviderBaseContextProps,
	} from '$components/ui/toast';
	import { setContext, type Snippet } from 'svelte';

	export type ToastProviderBaseProps = {
		label: string;
		children?: Snippet<[]>;
		duration?: number;
		swipeThreshold?: number;
	};
</script>

<script lang="ts">
	let {
		children,
		duration = 5000,
		label = 'Notification',
		swipeThreshold = 50,
	}: ToastProviderBaseProps = $props();

	let isToastVisible = $state({ value: false });

	setContext<ToastProviderBaseContextProps>('toast-provider-base-context', {
		isToastVisible,
		label,
		duration,
		swipeThreshold,
	});

	$effect(() => {
		isToastVisible.value = activeToast.value ? true : false;
	});
</script>

{@render children?.()}
