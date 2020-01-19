import settings from '../../settings';
import app from '../../v/app';
import afterload from '../../helpers/afterload';
import { Preloader } from 'vevet';

// settings for the preloader
let ps = settings.preloader;



// init preloader
const preloader = (function() {



    // vars
    let preloader;



    // initialize preloader
    function init() {

        // create preloader
        preloader = new Preloader({
            hide: true,
            animation: ps.animation,
            progress: ps.progress
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