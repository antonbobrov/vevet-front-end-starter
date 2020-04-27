import app from '../../v/app';
import afterload from '../../helpers/afterload';
import { PreloaderModule } from 'vevet';
import { isTesting } from '../../settings';



// settings for the preloader
let settings = {
    animation: !isTesting ? 500 : 0,
    progress: {
        on: false,
        forceEnd: true,
        k: !isTesting ? .035 : 1,
        forceEndDuration: !isTesting ? 1500 : 10
    }
};



// init preloader
const preloader = (function() {



    // vars
    let preloader;



    // initialize preloader
    function init() {

        // create preloader
        preloader = new PreloaderModule({
            hide: true,
            animation: settings.animation,
            progress: settings.progress
        });

        // set events
        setEvents();

        // return preloader
        return preloader;

    }



    // events
    function setEvents() {

        // add event on hide
        preloader.add({
            target: 'hide',
            do: hide.bind(this)
        });

    }



    // hide preloader
    function hide() {

        afterload();

        app.vevetPage.show();
        
    }



    return init();

    

}());

export default preloader;