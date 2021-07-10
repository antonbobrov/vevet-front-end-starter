import { Event } from 'vevet';

export const updateThingsCallbacks = new Event();

export const updateThings = () => {
    updateThingsCallbacks.launchAll();
};
