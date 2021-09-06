import { IDestroyable } from '../commonTypes';
import app from './app';

export default function onResize (
    callback: () => void,
    name = '',
    timeout = 0,
): IDestroyable {
    const events: string[] = [];

    events.push(app.viewport.on('', () => {
        if (app.viewport.mobiledevice) {
            return;
        }
        callback();
    }, {
        name,
        timeout,
    }));

    events.push(app.viewport.on('w_', () => {
        if (!app.viewport.mobiledevice) {
            return;
        }
        callback();
    }, {
        name,
        timeout,
    }));

    function destroy () {
        events.forEach((eventId) => {
            app.viewport.remove(eventId);
        });
    }

    return {
        destroy: destroy.bind(this),
    };
}
