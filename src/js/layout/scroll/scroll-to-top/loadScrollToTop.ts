import { selectAll } from 'vevet-dom';

export default function loadScrollToTop () {
    const el = selectAll('scroll-to-top');
    if (el.length > 0) {
        import('./ScrollToTop');
    }
}
