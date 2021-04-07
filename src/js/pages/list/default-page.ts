import { PageModule } from 'vevet';
import { initLazyImages, LazyImages } from '../../layout/image/initLazyImages';
import { fullHeight } from '../../helpers/dom-css/fullHeight';
import { updateLayoutElements } from '../../helpers/dom-css/layoutElements';
import { customScroll } from '../../layout/scroll/custom-scroll/customScroll';
import { scrollView } from '../../layout/scroll/scroll-view/scrollView';
import { hidePage, showPage } from '../pageStates';
import { updateMenuLinks } from '../../layout/menu/updateMenuLinks';

import '../../layout/text/TextContent';



// Default Page Class
class DefaultPage extends PageModule {

    protected _lazyImages: false | LazyImages;

    get lazyImages () {
        return this._lazyImages;
    }



    create (ajax = false) {

        if (!super.create(ajax)) {
            return false;
        }

        // set full-height elements
        fullHeight.set();

        // create a custom scrolling
        customScroll.create();
        // create a scroll view
        scrollView.create();

        // update page elements
        updateLayoutElements();

        // update menu links
        if (this._throughAjax) {
            updateMenuLinks();
        }

        return this;

    }

    show () {

        if (!super.show()) {
            return false;
        }

        // enable custom scrolling
        customScroll.playAndSetClasses();
        // enable & update view
        scrollView.enable();

        // init lazy images
        const lazyImages = initLazyImages();
        this._lazyImages = lazyImages;
        this.on('destroy', () => {
            if (lazyImages) {
                lazyImages.destroy();
            }
        });

        // show the page
        if (this._throughAjax) {
            showPage();
        }

        return true;

    }

    hide () {

        if (!super.hide()) {
            return false;
        }

        // stop scroll
        customScroll.pause();

        // hide page
        hidePage();

        return true;

    }



}

const defaultPage = new DefaultPage({
    name: 'default-page',
});

export {
    DefaultPage,
    defaultPage,
};
