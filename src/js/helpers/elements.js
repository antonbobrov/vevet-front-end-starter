import app from '../modules/app';

let elements = (function() {

    let el = {
        logo: null,
        app: null,
        scroll: null,
    };

    let update = function() {

        el.logo = document.querySelector(".header-logo");
        el.app = document.querySelector(".app");
        el.scroll = document.querySelector(".scroll");

    };
    update();

    let get = function() {
        return el;
    };



    return {
        get: get.bind(this),
        update: update.bind(this)
    };



}());

export default elements;