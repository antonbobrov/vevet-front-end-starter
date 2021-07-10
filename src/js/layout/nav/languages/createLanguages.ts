import { isElement, selectAll, selectOne } from 'vevet-dom';
import { pageAjax } from '../../../pages/pageAjax';

export function createLanguages (
    parent: Element,
) {

    const selector = '.js-languages';
    const languagesElements = selectAll(selector, parent);
    languagesElements.forEach((staticEl) => {

        // update languages on pageAjax
        pageAjax.on('done', () => {

            // get languages
            const dynamicEl = selectOne(selector, pageAjax.lastData.e);

            if (isElement(dynamicEl)) {
                staticEl.innerHTML = dynamicEl.innerHTML;
            }

        });

    });

}
