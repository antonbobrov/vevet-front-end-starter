import app from './v/app';
import { fontSize } from './helpers/dom-css/fontSize';
import { fullHeight } from './helpers/dom-css/fullHeight';
import { setCSSVars } from './helpers/dom-css/cssVars';
import { preloader } from './modules/loading/preloader';
import { pagesRegistry } from './modules/page/pagesRegistry';

// init site

export function initSite () {

    const storage: any = {};



    // create vevet application
    storage.app = app;


    // set font size, full-height elements and css vars
    storage.fontSize = fontSize;
    storage.fullHeight = fullHeight;
    storage.cssVars = setCSSVars();



    // page preloader
    storage.preloader = preloader;



    // pages registry
    storage.pagesRegistry = pagesRegistry();

}
