import app from './app';

export interface IOnResize {
    remove: () => void;
}



export function onResize (
    callback: () => void,
    name = '',
    timeout = 0,
): IOnResize {

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



    function remove () {
        events.forEach((eventId) => {
            app.viewport.remove(eventId);
        });
    }



    return {
        remove: remove.bind(this),
    };

}
