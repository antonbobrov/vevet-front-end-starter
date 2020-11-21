import { PageModule } from 'vevet';
import { initLazyImages, LazyImages } from '../../modules/image/initLazyImages';
import { fullHeight } from '../../helpers/dom-css/fullHeight';
import { updateLayoutElements } from '../../helpers/dom-css/layoutElements';
import { customScroll } from '../../modules/scroll/customScroll/customScroll';
import { scrollView } from '../../modules/scroll/scrollView/scrollView';
import { hidePage, showPage } from '../pageStates';

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
        showPage();

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
