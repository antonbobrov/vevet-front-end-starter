import app from "./v/app";
import fontSize from "./helpers/fontSize";
import fullHeight from "./helpers/fullHeight";
import cssVars from "./helpers/cssVars";
import pagesRegistry from "./modules/page/pagesRegistry";
import preloader from "./modules/loading/preloader";

// init site

export default function initSite () {

    const storage: any = {};



    // create vevet application
    storage.app = app;


    // set font size, full-height elements and css vars
    storage.fontSize = fontSize;
    storage.fullHeight = fullHeight;
    storage.cssVars = cssVars();



    // page preloader
    storage.preloader = preloader;



    // pages registry
    storage.pagesRegistry = pagesRegistry();

}
