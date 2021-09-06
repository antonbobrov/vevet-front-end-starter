import { selectAll } from 'vevet-dom';

export default function loadScrollDown () {
    const el = selectAll('scroll-down');
    if (el.length > 0) {
        import('./ScrollDown');
    }
}
