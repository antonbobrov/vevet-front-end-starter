import app from '../modules/app';

let height = (function() {



    let set = function() {

        let el = document.querySelectorAll(".height-full");
        for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${app.viewport.size[1]}px`;
        }

    };
    set();

    app.viewport.add({
        target: '',
        do: set.bind(this)
    });

    app.load.add({
        do: set.bind(this)
    });



    return {
        set: set.bind(this)
    };



}());

export default height;