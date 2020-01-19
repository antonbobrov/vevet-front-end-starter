import home from "../home";
import createPage from "./createPage";
import pageAjax from "./pageAjax";

// the order of imports is important

function pagesRegistry() {

    let storage = {};



    // add pages
    storage.home = home;



    // bound pages with ajax
    storage.pageAjax = pageAjax;

    // and create current page
    storage.createPage = createPage;



    return storage;

}

export default pagesRegistry;