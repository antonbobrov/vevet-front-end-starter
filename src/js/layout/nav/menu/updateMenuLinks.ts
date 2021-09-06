import pageAjax from '../../../pages/pageAjax';

const selector = '.js-menu-link';

export default function updateMenuLinks () {
    pageAjax.updateMenuLinks({
        selectorOld: selector,
        selectorNew: selector,
    });
}
