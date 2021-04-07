import dat, { GUI } from 'dat.gui';
import { KeydownModule } from 'vevet';
import app from './app/app';

export const siteGUI: false | dat.GUI = (function () {

    const gui = new dat.GUI();
    gui.close();

    // show on keyboard "gui" type
    app.html.classList.add('show-dat-gui');
    window.addEventListener('load', () => {
        const keyboardEvent = new KeydownModule();
        keyboardEvent.on('queue', () => {
            app.html.classList.add('show-dat-gui');
        }, {
            keys: [71, 85, 73],
        });
    });

    return gui;

}());

export interface GUIType extends GUI {}
