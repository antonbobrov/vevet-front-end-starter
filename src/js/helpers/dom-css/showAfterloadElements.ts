import { selectAll } from 'vevet-dom';
import { afterloadDuration } from '../../settings';

// show elements when the page is loaded
// see also /src/styles/helpers/_afterload.scss

export function showAfterloadElements () {

    const el = selectAll('.afterload');
    for (let i = 0, l = el.length; i < l; i++) {
        const e = el[i];
        e.classList.add('afterload_show');
    }

    setTimeout(() => {
        for (let i = 0, l = el.length; i < l; i++) {
            const e = el[i];
            e.classList.remove('afterload');
            e.classList.remove('afterload_show');
        }
    }, (afterloadDuration + 50));

}
