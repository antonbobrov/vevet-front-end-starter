import { timeoutCallback } from 'vevet';

const highlightClass = 'tab-highlight';



export function setKeyboardTabHightlight () {

    let activeElement: Element | false = false;

    // set events
    window.addEventListener('keydown', onKeydown.bind(this));
    window.addEventListener('click', onClick.bind(this));



    // on keydown event
    function onKeydown (e: KeyboardEvent) {

        // if not tab
        if (e.keyCode !== 9) {
            return;
        }

        removeHighlight();
        // get active element
        timeoutCallback(() => {
            // change active element
            activeElement = document.activeElement;
            if (activeElement instanceof HTMLElement) {
                activeElement.classList.add(highlightClass);
            }
        }, 50);

    }

    function onClick () {
        removeHighlight();
    }



    function removeHighlight () {

        // remove focus class from the previous active element
        if (activeElement) {
            activeElement.classList.remove(highlightClass);
            activeElement = false;
        }

    }



}
