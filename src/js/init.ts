import './helpers/dom-css/adaptiveFontSize';
import './helpers/dom-css/fullHeight';
import './helpers/dom-css/setCssVars';
import './layout/loading/preloader';
import { registerPages } from './pages/registerPages';

// init site

export function initSite () {

    // register pages
    registerPages();

}
