import { selectAll } from 'vevet-dom';
import settings from './settings';

export default function loadPlayVideoButton () {
    const elements = selectAll(settings.tagName);
    if (elements.length > 0) {
        import('./PlayVideoButton');
    }
}
