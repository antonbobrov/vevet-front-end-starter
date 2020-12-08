import { selectAll } from 'vevet-dom';

export function loadScrollToTop () {

    const el = selectAll('scroll-to-top');
    if (el.length > 0) {
        import('./ScrollToTop');
    }

}
