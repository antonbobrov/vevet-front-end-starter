import { SelectModule } from 'vevet';
import { selectAll } from 'vevet-dom';
import { IAjaxFormElements } from './types';

export default function createCustomSelects (
    parent: Element,
): IAjaxFormElements {
    const selects: SelectModule[] = [];
    const observers: MutationObserver[] = [];

    const selectEl = selectAll('select', parent) as NodeListOf<HTMLSelectElement>;
    selectEl.forEach((input) => {
        const select = createSelect(input);
        selects.push(select);

        const mutation = new MutationObserver(() => {
            if (input.classList.contains('error')) {
                // @ts-ignore
                // eslint-disable-next-line no-underscore-dangle
                select._outer.classList.add('error');
            } else {
                // @ts-ignore
                // eslint-disable-next-line no-underscore-dangle
                select._outer.classList.remove('error');
            }
        });
        observers.push(mutation);
        mutation.observe(input, {
            attributes: true,
        });
    });

    return {
        destroy: () => {
            selects.forEach((select) => {
                select.destroy();
            });
            observers.forEach((observer) => {
                observer.disconnect();
            });
        },
    };
}



function createSelect (
    el: HTMLSelectElement,
) {
    const select = new SelectModule({
        selector: el,
        showSelected: true,
    });

    select.on('change', () => {
        if (select.value !== '') {
            el.classList.remove('error');
        }
    });

    return select;
}
