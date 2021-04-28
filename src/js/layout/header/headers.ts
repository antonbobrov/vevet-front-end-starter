import { ScrollModule } from 'vevet';
import { selectOne } from 'vevet-dom';
import { createLanguages } from '../languages/createLanguages';
import { disableTabIndex } from '../scroll/keyboard/tabindex';
import { getScrollSelector } from '../scroll/custom-scroll/settings';
import { onScroll } from '../scroll/onScroll';
import app from '../../app/app';
import { pageAjax } from '../../pages/pageAjax';
import { setPopupMenuButtonEvents } from '../menu/popup-menu/setPopupMenuButtonEvents';



let fixedHeader: Element;
let staticHeader: Element;



export const headers = (function () {

    // get header and copy it
    fixedHeader = selectOne('.header');
    // @ts-ignore
    staticHeader = fixedHeader.cloneNode(true);
    app.load.on('', () => {
        disableTabIndex(fixedHeader);
    });

    // set classnames to the header
    fixedHeader.classList.add('header_fixed');
    staticHeader.classList.add('header_static');



    // create languages
    createLanguages(staticHeader);
    createLanguages(fixedHeader);


    // set headers' buttons events
    setPopupMenuButtonEvents(fixedHeader);
    setPopupMenuButtonEvents(staticHeader);



    // append the static header to the page
    // this event must be called on "create" of a Vevet Page
    function appendStatic () {

        // get scroll outer
        const scrollOuter = getScrollSelector();
        let parent: Element;
        if (scrollOuter instanceof ScrollModule) {
            parent = selectOne('.custom-scroll__outer', scrollOuter.outer);
        }
        else {
            parent = selectOne('.custom-scroll__outer');
        }

        // and append
        parent.insertBefore(staticHeader, parent.firstChild);

        // update ajax links
        pageAjax.setLinks();

    }

    // hide the header on scroll
    function hideOnScroll () {

        // native event
        onScroll((scrollTop) => {
            seek(scrollTop);
        });

        // vars
        let scrollPrevValue = 0;
        seek(0);

        // seek on scroll
        function seek (scrollTop: number) {

            const edge = app.viewport.size[1] * 0.75;

            if (scrollTop < edge) {
                hideFixed();
            }
            else if (scrollTop > scrollPrevValue) {
                hideFixed();
            }
            else if (scrollTop < scrollPrevValue) {
                showFixed();
            }

            // change value
            scrollPrevValue = scrollTop;

        }

        // show fixed
        function showFixed () {
            app.html.classList.add('show-fixed-header');
            fixedHeader.classList.add('show-fixed');
        }
        // hide fixed
        function hideFixed () {
            app.html.classList.remove('show-fixed-header');
            fixedHeader.classList.remove('show-fixed');
        }

    }



    // show/hide fixed header without the influence of scrolling
    // its relevant only for tablets and mobiles
    function showFixedHeader () {
        fixedHeader.classList.add('show-fixed_important');
    }
    function hideFixedHeader () {
        fixedHeader.classList.remove('show-fixed_important');
    }



    // return methods
    return {
        appendStatic: appendStatic.bind(this),
        hideOnScroll: hideOnScroll.bind(this),
        showFixedHeader: showFixedHeader.bind(this),
        hideFixedHeader: hideFixedHeader.bind(this),
        fixedHeader,
        staticHeader,
    };


}());

export { fixedHeader, staticHeader };
