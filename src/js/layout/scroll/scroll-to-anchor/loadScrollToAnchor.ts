import { selectAll } from 'vevet-dom';

export function loadScrollToAnchor () {

    const el = selectAll('scroll-to-anchor');
    if (el.length > 0) {
        import('./ScrollToAnchor');
    }

}
