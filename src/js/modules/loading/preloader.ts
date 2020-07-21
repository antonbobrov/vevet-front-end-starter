import { PreloaderModule } from "vevet";
import app from "../../v/app";
import afterload from "../../helpers/afterload";
import { isTesting } from "../../settings";



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
const preloader = (function () {



    // vars
    let mod: PreloaderModule;



    // initialize preloader
    function init () {

        // create preloader
        mod = new PreloaderModule({
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
            target: "hide",
            do: hide.bind(this),
        });

    }



    // hide preloader
    function hide () {

        afterload();

        if (app.vevetPage) {
            app.vevetPage.show();
        }

    }



    return init();



}());

export default preloader;
