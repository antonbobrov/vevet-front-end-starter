import { SelectModule } from 'vevet';
import { selectAll } from 'vevet-dom';
import { IAjaxFormElements } from '../types';

export function createSelectElements (
    outer: HTMLElement,
): IAjaxFormElements {

    const selects: SelectModule[] = [];
    const observers: MutationObserver[] = [];

    const selectEl = selectAll('select', outer) as NodeListOf<HTMLSelectElement>;
    selectEl.forEach((el) => {

        const select = createSelect(el);
        selects.push(select);

        const mutation = new MutationObserver(() => {
            if (el.classList.contains('error')) {
                // @ts-ignore
                select._outer.classList.add('error');
            }
            else {
                // @ts-ignore
                select._outer.classList.remove('error');
            }
        });
        observers.push(mutation);
        mutation.observe(el, {
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
        showSelected: false,
    });

    select.on('change', () => {
        if (select.value !== '') {
            el.classList.remove('error');
        }
    });

    return select;

}
