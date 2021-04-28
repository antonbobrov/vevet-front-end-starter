import dat, { GUI } from 'dat.gui';
import app from './app/app';



export const minSiteGUIStep = 0.0001;



export const siteGUI: false | dat.GUI = (function () {

    if (app.viewport.mobiledevice) {
        return false;
    }
    if (!app.html.classList.contains('has-gui')) {
        return false;
    }

    const gui = new dat.GUI();
    gui.close();

    return gui;

}());

export interface GUIType extends GUI {}
