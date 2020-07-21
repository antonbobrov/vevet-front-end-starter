import { ScrollModule } from "vevet";
import { all } from "select-el";
import app from "../../v/app";
import { updateElements, elements } from "../../helpers/elements";
import observerSupported from "../../helpers/observerSupported";
import scrollSelector from "../scroll/scrollSelector";
import { resizeTimeout } from "../../settings";
import { load } from "../../helpers/imageLoader";

const { viewport } = app;

interface LazyImages {
    set: Function;
    reset: Function;
    destroy: Function;
}

export default function initLazyImages (
    outerSelector: false | HTMLElement = false,
    insersectionOuter: false | HTMLElement = false,
): LazyImages | false {



    // get current page
    const page = app.vevetPage;
    if (!page) {
        return false;
    }

    // Get Outer
    let outer: HTMLElement | ScrollModule;
    let parentElement: HTMLElement;

    const attr = "data-lazy-image-proceeded";



    // Vars
    let viewportEvent: string | boolean = false;

    let eventNative: any = false;
    let eventCustom: (boolean | string) = false;
    let observer: (IntersectionObserver | false) = false;

    let images: HTMLElement[] = [];

    const classNameLoad = "load";
    const classNameLoaded = "loaded";



    // Init ALL
    set();



    // Set events
    function set () {

        // update viewport
        addViewportEvent();

        // get intersection outer
        let outerForIntersection: HTMLElement;
        if (!insersectionOuter) {
            updateElements();
            outerForIntersection = elements.app;
        }
        else {
            outerForIntersection = insersectionOuter;
        }

        // get outer
        outer = getOuteSelector();
        if (!(outer instanceof ScrollModule)) {
            parentElement = outer;
        }
        else {
            parentElement = outer.outer;
        }

        // get images
        getImages();

        // show instant images on page shown
        if (page) {
            page.onPageShown(showInstantImages.bind(this));
        }

        // if observer supported
        if (observerSupported()) {
            const options = {
                root: outerForIntersection,
                rootMargin: "0px",
                threshold: 0.01,
            };
            observer = new IntersectionObserver(
                lazyImageObserve.bind(this),
                options,
            );
            addImagesToObserver();
        }
        // if observer not supported
        else {

            // if custom scroll
            if (outer instanceof ScrollModule) {
                eventCustom = outer.on("update", lazyImageBounding.bind(this));
            }
            else if (page) {
                eventNative = page.listener(
                    outer, "scroll",
                    lazyImageBounding.bind(this),
                    {},
                );
            }
            lazyImageBounding();

        }

    }



    function getOuteSelector () {
        if (!outerSelector) {
            return scrollSelector();
        }

        return outerSelector;

    }



    function addViewportEvent () {

        viewportEvent = viewport.add({
            target: "",
            do: reset.bind(this, true),
            timeout: resizeTimeout,
            name: "LAZY IMAGE",
        });

    }

    function removeViewportEvent () {

        if (typeof viewportEvent !== "boolean") {
            viewport.remove(viewportEvent);
            viewportEvent = false;
        }

    }



    // Reset events
    function reset (initAgain = true) {

        if (eventNative) {
            if (page) {
                page.removeEventListener({
                    el: eventNative.el,
                    id: eventNative.id,
                });
                eventNative = false;
            }
        }

        if (
            (outer instanceof ScrollModule)
            && typeof eventCustom === "string"
        ) {
            outer.remove(eventCustom);
            eventCustom = false;
        }

        if (observer) {
            observer.disconnect();
            observer = false;
        }

        images.forEach((image) => {
            image.removeAttribute(attr);
        });

        removeViewportEvent();

        if (initAgain) {
            set();
        }

    }

    // Destroy events
    function destroy () {

        removeViewportEvent();
        reset(false);

    }



    // get lazy images
    function getImages () {

        images = [];

        const items = all(".lazy-image, .lazy-bg", parentElement);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item instanceof HTMLElement) {
                if (item.getAttribute(attr) == null) {
                    images.push(item);
                    item.setAttribute(attr, "true");
                }
            }
        }

    }

    // add images to the intersection observer
    function addImagesToObserver () {

        if (observer instanceof IntersectionObserver) {
            for (let i = 0; i < images.length; i++) {
                observer.observe(images[i]);
            }
        }

    }

    // when the page is shown, show the images that must be loaded at once
    function showInstantImages () {

        // eslint-disable-next-line max-len
        const items = all(".lazy-image-instant, .lazy-bg-instant", parentElement);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item instanceof HTMLElement) {
                if (!item.classList.contains(classNameLoad)) {
                    item.classList.add(classNameLoad);
                    lazyImageLoad(item);
                }
            }
        }

    }



    // callback on observer
    function lazyImageObserve (entries: IntersectionObserverEntry[]) {

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el instanceof HTMLElement) {
                    if (!el.classList.contains(classNameLoad)) {
                        el.classList.add(classNameLoad);
                        el.style.willChange = "opacity";
                        lazyImageLoad(el);
                    }
                }
            }
        });

    }

    // callback on scroll update
    function lazyImageBounding () {

        const outerHeight = elements.app.clientHeight;

        for (let i = 0; i < images.length; i++) {

            const image = images[i];

            const boundingImage = image.getBoundingClientRect();
            if (
                boundingImage.top <= outerHeight
            ) {
                if (!image.classList.contains(classNameLoad)) {
                    image.classList.add(classNameLoad);
                    image.style.willChange = "opacity";
                    lazyImageLoad(image);
                }
            }

        }

    }



    // load an image
    function lazyImageLoad (img: HTMLElement) {

        // get attribute
        const src = img.getAttribute("data-src");

        // load image
        load(src, () => {
            if (img instanceof HTMLImageElement) {
                img.src = src;
            }
            else {
                img.style.backgroundImage = `url('${src}')`;
            }
            img.classList.add(classNameLoaded);
            setTimeout(() => {
                img.style.willChange = "";
            }, 250);
        });

    }



    return {
        set: set.bind(this),
        destroy: destroy.bind(this),
        reset: reset.bind(this),
    };



}
