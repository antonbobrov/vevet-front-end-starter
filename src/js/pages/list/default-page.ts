import { PageModule } from 'vevet';
import { initLazyImages, LazyImages } from '../../layout/image/initLazyImages';
import customScroll from '../../layout/scroll/custom-scroll/customScroll';
import { scrollView } from '../../layout/scroll/scroll-view/scrollView';
import { hidePage, showPage } from '../pageStates';
import updateMenuLinks from '../../layout/nav/menu/updateMenuLinks';

import '../../layout/text/text-content/TextContent';
import headers from '../../layout/nav/header/headers';

import setPopupButtons from '../../includes/popup/setPopupButtons';
import loadPlayVideoButton from '../../includes/media/play-video-button/loadPlayVideoButton';
import loadAjaxForm from '../../includes/form/loadAjaxForm';



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

        // create a custom scrolling
        customScroll.create();
        // create a scroll view
        scrollView.create();

        // append a static header to the page
        headers.appendStatic();
        // header on scroll
        headers.hideOnScroll();

        // load modules
        this._loadModules();

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

        // update menu links
        if (this._throughAjax) {
            updateMenuLinks();
        }

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



    /**
     * Load dynamic modules
     */
    protected _loadModules () {
        setPopupButtons();
        loadPlayVideoButton();
        loadAjaxForm();
    }
}

const defaultPage = new DefaultPage({
    name: 'default-page',
});

export {
    DefaultPage,
    defaultPage,
};
