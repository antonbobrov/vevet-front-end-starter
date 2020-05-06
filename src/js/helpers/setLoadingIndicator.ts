import app from "../v/app";

export default function setLoadingIndicator(bool = true) {

    if (bool) {
        app.html.classList.add("loading");
    }
    else {
        app.html.classList.remove("loading");
    }

}