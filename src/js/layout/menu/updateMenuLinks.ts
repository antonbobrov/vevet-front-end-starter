import { pageAjax } from '../../pages/pageAjax';
import { MENU_LINKS_SELECTOR } from './vars';

export function updateMenuLinks () {

    pageAjax.updateMenuLinks({
        selectorOld: MENU_LINKS_SELECTOR,
        selectorNew: MENU_LINKS_SELECTOR,
    });

}
