import home from "../home";
import createPage from "./createPage";
import pageAjax from "./pageAjax";

// the order of imports is important

function pagesRegistry() {

    let storage = {
        pages: []
    };



    // add pages
    storage.pages.push(home);



    // bound pages with ajax
    storage.pageAjax = pageAjax;

    // and create current page
    createPage();



    return storage;

}

export default pagesRegistry;