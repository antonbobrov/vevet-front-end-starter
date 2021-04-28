import { selectAll } from 'vevet-dom';

export default function loadAjaxForm () {

    const elements = selectAll('ajax-form');
    if (elements.length > 0) {
        import('./AjaxForm');
    }

}
