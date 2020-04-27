import { elements, updateElements } from '../helpers/elements';
import { PageModule } from 'vevet';
import fullHeight from '../helpers/fullHeight';
import customScroll from '../modules/scroll/customScroll';
import scrollView from '../modules/scrollView/scrollView';


// Default Page Class
class DefaultPage extends PageModule {



    create(ajax) {

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

        return true;

    }

    show() {

        if (!super.show()) {
            return false;
        }

        // enable custom scrolling
        customScroll.playAndSetClasses();
        // enable & update view
        scrollView.enable();

        // show app
        elements.app.classList.remove("hide");

        return true;

    }

    hide() {

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

new DefaultPage({
    name: 'default-page'
});

export default DefaultPage;