<script
	lang="ts"
	module
>
	import {
		Toast,
		ToastProviderBase,
		ToastTitle,
		ToastViewport,
		type ToastProviderBaseProps,
	} from '$components/ui/toast';
</script>

<script lang="ts">
	let { children, ...restProps }: ToastProviderBaseProps = $props();
</script>

<ToastProviderBase {...restProps}>
	{@render children?.()}
	<ToastViewport>
		<Toast>
			<ToastTitle />
		</Toast>
	</ToastViewport>
</ToastProviderBase>
