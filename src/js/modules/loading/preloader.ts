import { PreloaderModule } from 'vevet';
import app from '../../v/app';
import { isTesting } from '../../settings';
import { showAfterloadElements } from '../../helpers/dom-css/showAfterloadElements';



// settings for the preloader
const settings = {
    animation: !isTesting ? 500 : 0,
    progress: {
        on: false,
        forceEnd: true,
        k: !isTesting ? 0.035 : 1,
        forceEndDuration: !isTesting ? 1500 : 10,
    },
};



// init preloader
export const preloader = (function () {



    // vars
    let mod: PreloaderModule;



    // initialize preloader
    function init () {

        // create preloader
        mod = new PreloaderModule({
            selector: '#preloader',
            hide: true,
            animation: settings.animation,
            progress: settings.progress,
        });

        // set events
        setEvents();

        // return preloader
        return mod;

    }



    // events
    function setEvents () {

        // add event on hide
        mod.add({
            target: 'hide',
            do: hide.bind(this),
        });

    }



    // hide preloader
    function hide () {

        showAfterloadElements();

        if (app.vevetPage) {
            app.vevetPage.show();
        }

    }



    return init();



}());
