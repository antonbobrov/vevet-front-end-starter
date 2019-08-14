import { Preloader } from './vevet';

import settings from '../settings';
import app from './app';
import afterload from '../helpers/afterload';

let preloader = (function() {



    // settings

    let preloader = false;



    // initialize preloader

    function init() {

        // create preloader
    
        preloader = new Preloader();

        // set events
        _setEvents();

        // return preloader
        return preloader;

    }



    // events

    function _setEvents() {

        // on hide

        preloader.add({
            target: 'hide',
            do: hide.bind(this)
        });

    }



    // hide preloader

    function hide() {

        afterload();

        setTimeout(() => {
            app.vevetPage.show();
        }, settings.preloader.showPage);

    }



    return init();


}());

export default preloader;