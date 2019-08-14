import '../styles/index.scss';



// because of tree-shaking some modules may not be loaded. let's do a crutch

let rand = Math.random();
window[rand] = {};



// site

import app from './modules/app';
window[rand].app = app;
window.app = app;

import preloader from './modules/preloader';
window[rand].preloader = preloader;



import fontSize from './helpers/fontSize';
window[rand].fontSize = fontSize;

import height from './helpers/height';
window[rand].height = height;



import home from './pages/home';
window[rand].home = home;

import pageAjax from './pages/_pageAjax';
window[rand].pageAjax = pageAjax;

import createPage from './pages/_createPage';
window[rand].createPage = createPage;