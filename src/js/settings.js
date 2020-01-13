import {ResponsiveProp} from './vevet/vevet';

let test = false;

let rp = new ResponsiveProp({

    test: test,

    resizeTimeout: 100,

    afterload: 1000,

    page: {
        default: 'default',
        load: 500,
        update: 25,
        done: 100
    },

    preloader: {
        k: !test ? .035 : 1,
        duration: !test ? 1500 : 10,
        animation: !test ? 0 : 0,
        showPageTimeout: 25
    },

    font: {
        adaptive: true
    },

});

let settings = rp._prop;

export default settings;