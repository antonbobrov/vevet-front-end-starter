import { TimelineModule } from 'vevet';
import { layoutElements } from '../helpers/dom-css/layoutElements';
import { scrollToTop } from '../layout/scroll/scrollTo';
import { showHidePageDuration } from '../settings';

function getElements () {
    return [
        layoutElements.app as HTMLElement,
    ];
}



export function hidePage (
    duration = showHidePageDuration,
    scrollTop = true,
) {

    const outers = getElements();
    const { length } = outers;

    for (let i = 0; i < length; i++) {
        outers[i].classList.add('hide');
        outers[i].style.pointerEvents = 'none';
    }

    const tm = new TimelineModule();
    tm.on('progress', (data) => {
        for (let i = 0; i < length; i++) {
            outers[i].style.opacity = (1 - data.se).toString();
        }
    });
    tm.on('end', () => {
        if (scrollTop) {
            scrollToTop(0);
        }
    });
    tm.play({
        duration,
    });

}



export function showPage (
    duration = showHidePageDuration,
) {

    const outers = getElements();
    const { length } = outers;

    for (let i = 0; i < length; i++) {
        outers[i].classList.remove('hide');
        outers[i].style.pointerEvents = '';
    }

    const tm = new TimelineModule();
    tm.on('progress', (data) => {
        for (let i = 0; i < length; i++) {
            outers[i].style.opacity = data.se.toString();
        }
    });
    tm.play({
        duration,
    });

}
