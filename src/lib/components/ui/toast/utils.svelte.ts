import type { ToastProps } from '$components/ui/toast';

export let toastQueue = $state<{ value: ToastProps[] }>({ value: [] });

export const activeToast = $derived({ value: toastQueue.value[0] });

export function showToast({ title, content, duration = 5000 }: ToastProps) {
	toastQueue.value.push({
		title,
		content,
		duration,
	});
}
