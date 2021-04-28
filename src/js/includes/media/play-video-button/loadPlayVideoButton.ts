import { selectAll } from 'vevet-dom';
import { playVideoButtonTagName } from './settings';

export function loadPlayVideoButton () {

    const elements = selectAll(playVideoButtonTagName);
    if (elements.length > 0) {
        import('./PlayVideoButton');
    }

}
