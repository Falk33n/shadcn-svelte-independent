<script
	lang="ts"
	module
>
	import {
		activeToast,
		type ToastProviderBaseContextProps,
	} from '$components/ui/toast';
	import type {
		EmptyContext,
		HTMLDivElementReference,
		ValidateContextProps,
	} from '$types';
	import { cn, validateContext } from '$utils';
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type ToastTitleAttributes = Omit<
		HTMLAttributes<HTMLDivElement>,
		'children'
	>;

	export type ToastTitleChildProps = {
		props: ToastTitleAttributes & {
			ref: HTMLDivElementReference;
		};
	};

	export type ToastTitleProps = ToastTitleAttributes & {
		ref?: HTMLDivElementReference;
		child?: Snippet<[ToastTitleChildProps]>;
	};

	const providerContextSettings: ValidateContextProps<ToastProviderBaseContextProps> =
		{
			key: 'toast-provider-base-context',
			source: 'ToastProviderBase',
			target: 'ToastTitle',
		};

	const viewportContextSettings: ValidateContextProps<EmptyContext> = {
		key: 'toast-viewport-context',
		source: 'ToastViewport',
		target: 'ToastTitle',
	};

	const rootContextSettings: ValidateContextProps<EmptyContext> = {
		key: 'toast-root-context',
		source: 'ToastRoot',
		target: 'ToastTitle',
	};
</script>

<script lang="ts">
	validateContext(providerContextSettings);
	validateContext(viewportContextSettings);
	validateContext(rootContextSettings);

	let {
		ref = $bindable<HTMLDivElementReference>(null),
		class: className,
		child,
		...restProps
	}: ToastTitleProps = $props();

	const childProps: ToastTitleChildProps = {
		props: {
			ref,
			...restProps,
		},
	};
</script>

{#if activeToast.value}
	{#if child}
		{@render child(childProps)}
	{:else}
		<div
			bind:this={ref}
			class={className ? cn(className) : undefined}
			{...restProps}
		>
			{activeToast.value.title}
		</div>
	{/if}
{/if}
