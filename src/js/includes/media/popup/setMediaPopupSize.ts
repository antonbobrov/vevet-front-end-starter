import { selectOne } from 'vevet-dom';
import app from '../../../app/app';

const { viewport } = app;



// set popup container sizes
export function setMediaPopupSize (
    outer: HTMLElement,
) {

    const yPadding = getYPadding(outer);
    const newSizes = getContainerMustBeSize(yPadding);

    app.html.style.setProperty('--popup-media-width', `${newSizes.width}px`);
    app.html.style.setProperty('--popup-media-height', `${newSizes.height}px`);

}



function getYPadding (
    outer: HTMLElement,
) {

    const close = selectOne('.v-popup__close', outer);
    const closeBounding = close.getBoundingClientRect();

    return closeBounding.height + closeBounding.top * 2;

}



function getContainerMustBeSize (yPadding: number) {

    const { size } = viewport;
    const maxWidth = app.viewport.mobile ? size[0] : size[0] * 0.8;
    const maxHeight = size[1];

    let height: number;
    let width: number;

    height = maxHeight - yPadding * 2;
    width = height * (1 / 0.5625);
    if (width > maxWidth) {
        width = maxWidth;
        height = width * 0.5625;
    }
    if (width > 1800) {
        width = 1800;
        height = width * 0.5625;
    }

    return {
        width,
        height,
    };

}
