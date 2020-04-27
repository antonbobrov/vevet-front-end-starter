import createPage from "./createPage";
import pageAjax from "./pageAjax";
import homePage from "../../pages/home-page";

function pagesRegistry() {

    let storage = {
        pages: []
    };



    // add pages
    storage.pages.push(homePage);



    // bound pages with ajax
    storage.pageAjax = pageAjax;

    // and create current page
    createPage();



    return storage;

}

export default pagesRegistry;