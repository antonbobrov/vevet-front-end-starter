import app from "./v/app";
import preloader from "./modules/loading/preloader";
import fullHeight from "./helpers/fullHeight";
import fontSize from "./helpers/fontSize";
import cssVars from "./helpers/cssVars";
import pagesRegistry from "./pages/init/pagesRegistry";

// init site

function init() {

    let storage = {};



    // create vevet application
    storage.app = app;
    window.app = app;


    // set font size, full-height elements and css vars
    storage.fontSize = fontSize;
    storage.fullHeight = fullHeight;
    storage.cssVars = cssVars();


    // show preloader
    storage.preloader = preloader;



    // pages registry
    storage.pagesRegistry = pagesRegistry();

}

export default init;