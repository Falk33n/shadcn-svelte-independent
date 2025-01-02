<script lang="ts">
	import '../app.css';
	import { ToastProvider } from '../lib/components/ui/toast';
	let { children } = $props();
</script>

<ToastProvider label="Notification">
	{@render children()}
</ToastProvider>
