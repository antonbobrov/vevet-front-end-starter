import { MenuTimelineModule, TimelineBaseModule, mathSpreadScopeProgress } from 'vevet';
import { selectOne, isElement, selectAll } from 'vevet-dom';
import app from '../../../app/app';
import { pageAjax } from '../../../pages/pageAjax';
import { createLanguages } from '../../languages/createLanguages';



const ms = {
    duration: 1000,
    outerScope: [0, 0.75],
    innerScope: [0.25, 1],
    elShift: 0.85,
};

const menuElClass = {
    translate: 'v-menu__translate',
    alpha: 'v-menu__alpha',
};



export const popupMenu = (function () {

    // get outer
    const outer = selectOne('#menu') as HTMLElement;
    if (!isElement(outer)) {
        return false;
    }

    // get bg elements
    const bg = selectOne('.v-menu__bg', outer) as HTMLElement;
    if (!isElement(bg)) {
        return false;
    }

    // process languages
    createLanguages(outer);

    // get close buttons
    const closeButtons = selectAll('.js-menu-close-button');

    // initialize menu
    const module = new MenuTimelineModule({
        selectors: {
            button: '.not-existing-element',
            outer,
        },
        timeline: {
            duration: ms.duration,
            outerScope: ms.outerScope,
            innerScope: ms.innerScope,
            easing: 'linear',
        },
    });


    init();



    // initialize the menu
    function init () {

        // create a timeline for animation
        createAnimationTimelines();

        // set events
        setEvents();

        // hide menu on page change
        pageAjax.on('prepare', () => {
            // if menu is opened
            if (module.shown) {
                // hide the menu
                module.hide();
            }
        }, {
            timeout: 50,
        });

        // hide menu on escape
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                module.hide();
            }
        });

    }


    // set button events
    function setEvents () {

        closeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                module.hide();
            });
        });

        module.on('show', () => {
            app.html.classList.add('prevent-scroll-under-popup-menu');
        });

        module.on('hide', () => {
            app.html.classList.remove('prevent-scroll-under-popup-menu');
        });

    }



    // create a timeline for animation
    function createAnimationTimelines () {

        createOuterAnimation();
        createElementsAnimation();

    }

    // animate outer
    function createOuterAnimation () {

        // the timeline itself
        const timeline = new TimelineBaseModule({
            easing: [0.25, 0.1, 0.25, 1],
        });
        timeline.on('progress', (data) => {
            bg.style.transform = `scale(1, ${data.se})`;
        });

        // imitate progress
        module.on('progressOuter', (data) => {
            timeline.imitate(data.p);
        });

    }

    // animate elements
    function createElementsAnimation () {

        const elements = selectAll(`
            .${menuElClass.translate},
            .${menuElClass.alpha}
        `);

        // spread elements
        const spread = mathSpreadScopeProgress(elements.length, ms.elShift);

        // the timeline itself
        const timeline = new TimelineBaseModule({
            easing: 'linear',
        });

        // animate elements
        for (let i = 0; i < spread.length; i++) {

            const innerTimeline = new TimelineBaseModule({
                line: spread[i],
                easing: [0.25, 0.1, 0.25, 1],
            });

            innerTimeline.on('progress', (data) => {
                const el = elements[i] as HTMLElement;
                if (el.classList.contains(menuElClass.alpha)) {
                    el.style.opacity = data.se.toString();
                }
                else if (el.classList.contains(menuElClass.translate)) {
                    el.style.transform = `
                        translate3d(0, ${(1 - data.se) * 2}rem, 0)
                    `;
                    el.style.opacity = data.se.toString();
                }
            });

            timeline.addTimeline(innerTimeline);

        }

        // imitate progress
        module.on('progressInner', (data) => {
            timeline.imitate(data.p);
        });

    }



    // eslint-disable-next-line consistent-return
    return module;



}());
