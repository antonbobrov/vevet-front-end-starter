import { ResponsiveProp } from "vevet";

let test = false;

let rp = new ResponsiveProp({

    test: test,

    resizeTimeout: 100,

    afterload: 1000,

    font: {
        adaptive: true
    },



    page: {
        default: 'default',
        load: 250,
        update: 0,
        done: 0
    },



    preloader: {
        animation: !test ? 0 : 0,
        progress: {
            on: false,
            forceEnd: true,
            k: !test ? .035 : 1,
            forceEndDuration: !test ? 1500 : 10
        }
    },



    scroll: {
        custom: true
    },

    view: {
        autostack: {
            on: true,
            delay: 1500
        }
    },

    
    
    responsive: [{
        breakpoint: 'md',
        settings: {
            font: {
                // adaptive: false
            }
        }
    }],

});

let settings = rp._prop;

export default settings;