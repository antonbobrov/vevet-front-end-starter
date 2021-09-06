import { DefaultPage } from '../pages/list/default-page';
import app from './app';
import { IDestroyable } from '../commonTypes';

export default function onPageCreated (
    callback: () => void,
): IDestroyable {
    let destroyed = false;
    trace();

    function trace () {
        if (destroyed) {
            return;
        }
        const page = app.vevetPage as DefaultPage;
        if (!!page && page.created) {
            callback();
            return;
        }
        setTimeout(() => {
            trace();
        }, 30);
    }

    return {
        destroy: () => {
            destroyed = true;
        },
    };
}
