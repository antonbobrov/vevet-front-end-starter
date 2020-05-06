import { ScrollModule, ScrollBarPlugin } from "vevet";
import { useCustomScroll, resizeTimeout } from "../../settings";
import app from "../../v/app";
import getCustomScrollElementsSelector from "./getCustomScrollElementsSelector";
import getCustomScrollEase from "./getCustomScrollEase";
import scrollCanBeCustom from "./scrollCanBeCustom";
import { all } from "select-el";



let currentScrollModule: false | ScrollModule = false;


interface CustomScroll {
    get: () => false | ScrollModule;
    create: () => false | ScrollModule;
    pause: () => boolean;
    play: () => boolean;
    toggle: () => Function;
    playAndSetClasses: () => boolean;
}
const customScroll: CustomScroll = (function() {
    return {
        get: getScroll.bind(this),
        create: createScroll.bind(this),
        pause: pause.bind(this),
        play: play.bind(this),
        toggle: toggleScroll.bind(this),
        playAndSetClasses: playAndSetClasses.bind(this)
    }
})();

export default customScroll;




function getScroll() {
    return currentScrollModule;
}

function createScroll() {

    if (!useCustomScroll) {
        currentScrollModule = false;
        return false;
    }

    // initialize scroll
    const scroll = new ScrollModule({
        selectors: {
            outer: '.scroll',
            elements: getCustomScrollElementsSelector()
        },
        ease: getCustomScrollEase(),
        willChange: true,
        resizeTimeout: resizeTimeout,
        run: false,
        responsive: [
            {
                breakpoint: 't',
                settings: {
                    run: false
                }
            }
        ]
    });

    // destroy the scroll on page destroy
    if (app.vevetPage) {
        app.vevetPage.on("destroy", () => {
            scroll.destroy();
        })
    }

    // set scroll classes
    setScrollClasses(scroll, false);

    // add scrollbars
    scroll.addPlugin(new ScrollBarPlugin());

    // enable or disable scroll on resize
    if (app.vevetPage) {
        app.vevetPage.addEvent('viewport', {
            target: 'w_',
            do: toggleScroll.bind(this, true)
        });
    }

    // change var
    currentScrollModule = scroll;
    
    return scroll;

}



function toggleScroll(onResize = false) {

    // get scroll
    const scroll = getScroll();
    if (scroll) {

        // bool
        const playBool = scrollCanBeCustom();
        // either play or pause
        if (playBool) {
            playPause(scroll, true);
        }
        else {
            playPause(scroll, false);
        }

        // classes
        if (onResize) {
            setScrollClasses(scroll, playBool);
        }

    }

}

function playPause(scroll: ScrollModule, bool = true) {

    if (bool) {
        scroll.outer.scrollTop = 0;
        scroll.outer.scrollLeft = 0;
    }

    // change scroll properties
    scroll.changeProp({
        run: bool
    });

}

function pause() {
    if (!useCustomScroll || !scrollCanBeCustom()) {
        return false;
    }
    const scroll = getScroll();
    if (scroll) {
        playPause(scroll, false);
        return true;
    }
    return false;
}

function play() {
    if (!useCustomScroll || !scrollCanBeCustom()) {
        return false;
    }
    const scroll = getScroll();
    if (scroll) {
        playPause(scroll, true);
        return true;
    }
    return false;
}

function playAndSetClasses() {
    if (!useCustomScroll || !scrollCanBeCustom()) {
        return false;
    }
    const scroll = getScroll();
    if (scroll) {
        setScrollClasses(scroll, true);
        play();
        return true;
    }
    return false;
}



function setScrollClasses(scroll: ScrollModule, bool: boolean) {

    // get scroll outer
    const scrollOuter = scroll.outer;
    // and scroll elements
    const elements = all(getCustomScrollElementsSelector());

    if (bool) {
        // classes
        scrollOuter.classList.remove("unactive");
    }
    else {
        // classes
        scrollOuter.classList.add("unactive");
        // transform
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el instanceof HTMLElement) {
                el.style.transform = '';
            }
        }
    }

}