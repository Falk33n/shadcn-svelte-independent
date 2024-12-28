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
		if (rootContext.collapsible === false) {
			if (rootContext.rootValue !== itemContext.value) {
				rootContext.changeValue(itemContext.value);
			}
		} else {
			rootContext.changeValue(
				rootContext.rootValue === itemContext.value ? '' : itemContext.value,
			);
		}
	} else if (
		rootContext.type === 'multiple' &&
		Array.isArray(rootContext.rootValue)
	) {
		if (rootContext.collapsible === false) {
			if (!rootContext.rootValue.includes(itemContext.value)) {
				rootContext.changeValue([
					...(rootContext.rootValue as string[]),
					itemContext.value,
				]);
			}
		} else {
			if (rootContext.rootValue.includes(itemContext.value)) {
				rootContext.changeValue(
					(rootContext.rootValue as string[]).filter(
						(val) => val !== itemContext.value,
					),
				);
			} else {
				rootContext.changeValue([
					...(rootContext.rootValue as string[]),
					itemContext.value,
				]);
			}
		}
	}

	if (rootContext.rootValue !== undefined) {
		rootContext.onValueChange?.(rootContext.rootValue as string | string[]);
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

export function onAccordionHeightChange(
	ref: HTMLDivElement,
	isHidden: boolean,
) {
	const contentHeight = !isHidden ? `${ref.scrollHeight}px` : '0px';
	ref.style.setProperty('--accordion-content-height', contentHeight);
}
