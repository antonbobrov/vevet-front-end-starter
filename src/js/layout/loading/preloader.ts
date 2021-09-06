import { PreloaderModule, timeoutCallback } from 'vevet';
import app from '../../app/app';
import { isTesting } from '../../settings';
import { showAfterloadElements } from '../../helpers/dom-css/showAfterloadElements';
import { setPreloaderReady } from './onPreloaderReady';

// init preloader
export const preloader = (function () {

    // vars
    const mod = new PreloaderModule({
        selector: '#preloader',
        hide: true,
        animation: !isTesting ? 500 : 0,
        progress: {
            on: false,
            forceEnd: true,
            k: !isTesting ? 0.035 : 1,
            forceEndDuration: !isTesting ? 1500 : 10,
        },
    });

    // add event on hide
    mod.add({
        target: 'hide',
        do: hide.bind(this),
    });

    // make preloader ready
    timeoutCallback(() => {
        setPreloaderReady();
    }, isTesting ? 0 : 0);



    return mod;



    // hide preloader
    function hide () {

        showAfterloadElements();

        if (app.vevetPage) {
            app.vevetPage.show();
        }

    }

}());
