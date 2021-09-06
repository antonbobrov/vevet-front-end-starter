import { Event } from 'vevet';
import { IDestroyable } from '../../commonTypes';

const eventCallbacks = new Event();

let preloaderReadyBool = false;
export function setPreloaderReady () {
    preloaderReadyBool = true;
    eventCallbacks.launchAll();
}

export function onPreloaderReady (
    callback: () => void,
): IDestroyable {
    let callbackId: false | string = false;
    if (preloaderReadyBool) {
        callback();
    }
    else {
        callbackId = eventCallbacks.on('', () => {
            callback();
        });
    }
    return {
        destroy: () => {
            if (callbackId) {
                eventCallbacks.remove(callbackId);
            }
        },
    };

}
