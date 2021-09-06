import { Event } from 'vevet';

const updateThings = (function func () {
    const events = new Event();

    return {
        launchCallbacks: () => {
            events.launchAll();
        },
        add: (
            callback: (...arg: any) => void,
        ) => {
            const id = events.on('', () => {
                callback();
            });
            return {
                destroy: () => {
                    events.remove(id);
                },
            };
        },
    };
}());

export default updateThings;
