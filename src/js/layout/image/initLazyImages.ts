import { selectAll } from 'vevet-dom';
import app from '../../app/app';
import { resizeTimeout } from '../../settings';
import layoutElements from '../../helpers/dom-css/layoutElements';
import { loadImage } from './imageLoader';
import { getScrollSelector } from '../scroll/custom-scroll/settings';
import { CustomScrollType, isCustomScroll } from '../scroll/custom-scroll/isCustomScroll';
import {
    intersectionObserverSupported,
} from '../scroll/intersection-observer/observer';
import './LazyImg';

const { viewport } = app;

export interface LazyImages {
    set: Function;
    reset: Function;
    destroy: Function;
}

export function initLazyImages (
    outerSelector: false | HTMLElement = false,
): LazyImages | false {
    let destroyed = false;



    // get current page
    const page = app.vevetPage;
    if (!page) {
        return false;
    }

    // Get Outer
    let outer: HTMLElement | CustomScrollType;
    let parentElement: HTMLElement;

    const proceededAttribute = 'data-lazy-image-proceeded';



    // Vars
    let viewportEvent: string | boolean = false;

    let eventNative: any = false;
    let eventCustom: (boolean | string) = false;
    let observer: (IntersectionObserver | false) = false;

    let images: HTMLElement[] = [];

    const classNameLoad = 'load';
    const classNameLoaded = 'loaded';



    // Init ALL
    set();



    // Set events
    function set () {
        if (destroyed) {
            return;
        }

        // update viewport
        addViewportEvent();

        // get outer
        outer = getOuteSelector();
        if (!isCustomScroll(outer)) {
            parentElement = outer as HTMLElement;
        } else {
            const mod = outer as CustomScrollType;
            parentElement = mod.outer as HTMLElement;
        }

        // get images
        getImages();

        // show instant images on page shown
        if (page) {
            page.onPageShown(showInstantImages.bind(this));
        }

        // if observer supported
        if (intersectionObserverSupported()) {
            const options: IntersectionObserverInit = {
                root: null,
                rootMargin: '0px',
                threshold: 0.01,
            };
            observer = new IntersectionObserver(
                lazyImageObserve.bind(this),
                options,
            );
            addImagesToObserver();
        } else {
            // if observer not supported
            // if custom scroll
            if (isCustomScroll(outer)) {
                // @ts-ignore
                eventCustom = outer.on('update', lazyImageBounding.bind(this));
            } else if (page) {
                eventNative = page.listener(
                    outer as HTMLElement,
                    'scroll',
                    lazyImageBounding.bind(this),
                    {},
                );
            }
            lazyImageBounding();
        }
    }



    function getOuteSelector () {
        if (!outerSelector) {
            return getScrollSelector();
        }

        return outerSelector;
    }



    function addViewportEvent () {
        viewportEvent = viewport.add({
            target: 'w_',
            do: reset.bind(this, true),
            timeout: resizeTimeout,
            name: 'LAZY IMAGE',
        });
    }

    function removeViewportEvent () {
        if (typeof viewportEvent !== 'boolean') {
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
            (isCustomScroll(outer))
            && typeof eventCustom === 'string'
        ) {
            outer.remove(eventCustom);
            eventCustom = false;
        }

        if (observer) {
            observer.disconnect();
            observer = false;
        }

        images.forEach((image) => {
            image.removeAttribute(proceededAttribute);
        });

        removeViewportEvent();

        if (initAgain) {
            set();
        }
    }

    // Destroy events
    function destroy () {
        destroyed = true;

        removeViewportEvent();
        reset(false);
    }



    // get lazy images
    function getImages () {
        images = [];

        const items = selectAll('.lazy-image, .lazy-bg', parentElement);
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i];
            if (item instanceof HTMLElement) {
                if (item.getAttribute(proceededAttribute) == null) {
                    images.push(item);
                    item.setAttribute(proceededAttribute, 'true');
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
        const items = selectAll(
            '.lazy-image-instant, .lazy-bg-instant',
            parentElement,
        );
        for (let i = 0, l = items.length; i < l; i++) {
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
                    prepareImage(el);
                }
            }
        });
    }

    // callback on scroll update
    function lazyImageBounding () {
        const outerHeight = layoutElements.app.clientHeight;

        for (let i = 0; i < images.length; i++) {
            const image = images[i];

            const boundingImage = image.getBoundingClientRect();
            if (
                boundingImage.top <= outerHeight
            ) {
                prepareImage(image);
            }
        }
    }

    // prepare the image for loading
    function prepareImage (
        el: HTMLElement,
    ) {
        if (!el.classList.contains(classNameLoad)) {
            el.classList.add(classNameLoad);
            el.style.willChange = 'opacity';
            lazyImageLoad(el);
        }
    }



    // load an image
    function lazyImageLoad (img: HTMLElement) {
        // get data-src attribute
        const srcAttr = img.getAttribute('data-src');
        if (srcAttr) {
            // load image
            loadImage(srcAttr, () => {
                if (img instanceof HTMLImageElement) {
                    img.src = srcAttr;
                } else {
                    img.style.backgroundImage = `url('${srcAttr}')`;
                }

                handleImageLoaded(img);
            });
        } else if (img instanceof HTMLImageElement) {
            // if it does not exist, we check for data-srcset
            // but only if HTMLImageElement
            const srcsetAttr = img.getAttribute('data-srcset');
            if (srcsetAttr) {
                img.addEventListener('load', () => {
                    handleImageLoaded(img);
                });
                img.setAttribute('srcset', srcsetAttr);
            }
        }
    }

    // on image loaded handler
    function handleImageLoaded (
        el: HTMLElement,
    ) {
        setTimeout(() => {
            el.classList.add(classNameLoaded);
            setTimeout(() => {
                el.style.willChange = '';
            }, 250);
        }, 50);
    }



    return {
        set: set.bind(this),
        destroy: destroy.bind(this),
        reset: reset.bind(this),
    };
}
