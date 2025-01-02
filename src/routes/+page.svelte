<script lang="ts">
	import { getToastProviderBaseContext } from '../lib/components/ui/toast';

	const { activeToast, showToast } = getToastProviderBaseContext('HomePage');

	let click = $state(0);
</script>

<div class="flex h-screen w-full justify-center gap-8 p-4">
	<button
		onclick={() => {
			click += 1;
			showToast(activeToast, click === 1 ? 'title' : 'other', 'okokokok');
		}}
	>
		click
	</button>
</div>
