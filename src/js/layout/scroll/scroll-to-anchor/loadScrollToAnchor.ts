import { selectAll } from 'vevet-dom';

export default function loadScrollToAnchor () {
    const el = selectAll('scroll-to-anchor');
    if (el.length > 0) {
        import('./ScrollToAnchor');
    }
}
