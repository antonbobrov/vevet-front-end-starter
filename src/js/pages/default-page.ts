import { PageModule } from "vevet";
import fullHeight from "../helpers/fullHeight";
import customScroll from "../modules/scroll/customScroll";
import scrollView from "../modules/scrollView/scrollView";
import { updateElements, elements } from "../helpers/elements";
import { initLazyImages, LazyImages } from "../modules/image/initLazyImages";

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
        updateElements();

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
        this.on("destroy", () => {
            if (lazyImages) {
                lazyImages.destroy();
            }
        });

        // show app
        elements.app.classList.remove("hide");

        return true;

    }

    hide () {

        if (!super.hide()) {
            return false;
        }

        // stop scroll
        customScroll.pause();

        // hide app
        elements.app.classList.add("hide");

        return true;

    }



}

const defaultPage = new DefaultPage({
    name: "default-page",
});

export {
    DefaultPage,
    defaultPage,
};
