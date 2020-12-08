import app from '../../app/app';

export function setLoadingIndicator (bool = true) {

    if (bool) {
        app.html.classList.add('loading');
    }
    else {
        app.html.classList.remove('loading');
    }

}
