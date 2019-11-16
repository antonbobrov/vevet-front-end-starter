let test = false;

let settings = {

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

};

export default settings;