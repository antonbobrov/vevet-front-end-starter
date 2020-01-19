import settings from '../settings';

// show elements when the page is loaded
// see also /src/styles/helpers/_afterload.scss

function afterload() {

    let el = document.querySelectorAll(".afterload");
    for (let i = 0; i < el.length; i++) {
        el[i].classList.add("afterload_show");
    }

    setTimeout(() => {
        for (let i = 0; i < el.length; i++) {
            el[i].classList.remove("afterload");
            el[i].classList.remove("afterload_show");
        }
    }, (settings.afterload + 50));

}

export default afterload;