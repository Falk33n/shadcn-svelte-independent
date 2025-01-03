<script lang="ts">
	import { showToast } from '../lib/components/ui/toast';

	let click = $state(0);
</script>

<div class="flex h-screen w-full justify-center gap-8 p-4">
	<button
		onclick={() => {
			click += 1;
			showToast({
				title: click > 1 ? 'clickGreater' : 'click',
				content: 'clicked',
			});
		}}
	>
		click
	</button>
</div>
