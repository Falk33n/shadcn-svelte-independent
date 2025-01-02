import type { ToastProviderBaseContextProps } from '$components/ui/toast';
import type { ValidateContextProps } from '$types';
import { validateContext } from '$utils';

export function getToastProviderBaseContext(target: string) {
	const providerContextSettings: ValidateContextProps<ToastProviderBaseContextProps> =
		{
			key: 'toast-provider-base-context',
			source: 'ToastProviderBase',
			target,
		};

	return validateContext(providerContextSettings);
}
