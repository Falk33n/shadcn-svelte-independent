import type {
	AccordionItemContextProps,
	AccordionRootContextProps,
} from '$components/ui/accordion';

export function onAccordionOpenChange(
	rootContext: AccordionRootContextProps,
	itemContext: AccordionItemContextProps,
) {
	if (!rootContext || !itemContext) return;

	if (rootContext.type === 'single') {
		rootContext.setValue(
			rootContext.getValue() === itemContext.value ? '' : itemContext.value,
		);
	} else if (
		rootContext.type === 'multiple' &&
		Array.isArray(rootContext.getValue())
	) {
		if (rootContext.getValue()?.includes(itemContext.value)) {
			rootContext.setValue(
				(rootContext.getValue() as string[]).filter(
					(val) => val !== itemContext.value,
				),
			);
		} else {
			rootContext.setValue([
				...(rootContext.getValue() as string[]),
				itemContext.value,
			]);
		}
	}

	if (rootContext.getValue() !== undefined) {
		rootContext.onValueChange?.(rootContext.getValue() as string | string[]);
	}
}

export function onAccordionKeyboardNavigate(
	e: KeyboardEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	},
	ref: HTMLButtonElement,
) {
	const accordionRoot = ref.closest('[data-accordion="root"]');
	if (!accordionRoot) return;

	const triggers = Array.from(
		accordionRoot.querySelectorAll<HTMLButtonElement>(
			'[data-accordion="trigger"]',
		),
	);

	if (triggers.length === 0) return;

	const currentIndex = triggers.indexOf(e.currentTarget);

	if (e.key === 'ArrowDown') {
		e.preventDefault();
		const nextIndex = (currentIndex + 1) % triggers.length;
		triggers[nextIndex].focus();
	} else if (e.key === 'ArrowUp') {
		e.preventDefault();
		const prevIndex = (currentIndex - 1 + triggers.length) % triggers.length;
		triggers[prevIndex].focus();
	}
}

export function onAccordionHeightChange(ref: HTMLDivElement, isHidden?: true) {
	const contentHeight = !isHidden ? `${ref.scrollHeight}px` : '0px';
	ref.style.setProperty('--accordion-content-height', contentHeight);
}
