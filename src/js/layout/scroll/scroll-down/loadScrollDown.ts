import { selectAll } from 'vevet-dom';

export function loadScrollDown () {

    const el = selectAll('scroll-down');
    if (el.length > 0) {
        import('./ScrollDown');
    }

}
