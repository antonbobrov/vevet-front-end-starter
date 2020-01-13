import '../styles/index.scss';



// because of tree-shaking some modules may not be loaded. let's do a crutch
let rand = Math.random();
window[rand] = {};



// site
import app from './vevet/app';
window[rand].app = app;
window.app = app;

// modules
import preloader from './modules/loading/preloader';
window[rand].preloader = preloader;

// helpers
import fontSize from './helpers/fontSize';
window[rand].fontSize = fontSize;
import height from './helpers/height';
window[rand].height = height;
import cssVars from './helpers/cssVars';
cssVars();

// pages
import home from './pages/home';
window[rand].home = home;

// bound pages with ajax
import pageAjax from './pages/_pageAjax';
window[rand].pageAjax = pageAjax;

// and create the initial page
import createPage from './pages/_createPage';
window[rand].createPage = createPage;