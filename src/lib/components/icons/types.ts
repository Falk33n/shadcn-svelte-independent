import type { SVGAttributes } from 'svelte/elements';

export type IconProps = SVGAttributes<SVGElement> & {
	ref?: SVGElement | null;
};
