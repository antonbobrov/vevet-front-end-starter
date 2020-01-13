import { Preloader, utils } from '../../v/v';

import settings from '../../settings';
import app from '../../v/app';
import afterload from '../../helpers/afterload';

let ps = settings.preloader;

let preloader = (function() {



    // vars
    let preloader = false;



    // initialize preloader
    function init() {

        // create preloader
        preloader = new Preloader({
            hide: true,
            animation: ps.animation,
            progress: {
                on: false,
                forceEnd: true,
                k: ps.k,
                forceEndDuration: ps.duration
            }
        });

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

        utils.timeoutCallback(() => {
            app.vevetPage.show();
        }, ps.showPageTimeout);
        
    }



    return init();


}());

export default preloader;