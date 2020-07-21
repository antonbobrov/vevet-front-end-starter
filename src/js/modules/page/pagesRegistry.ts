import { PageModule } from "vevet";
import pageAjax from "./pageAjax";
import createPage from "./createPage";
import { homePage } from "../../pages/home-page";

function pagesRegistry () {

    const pages: PageModule[] = [];
    const storage: any = {};



    // add pages
    pages.push(homePage);



    // bound pages with ajax
    storage.pageAjax = pageAjax;

    // and create current page
    createPage();



    return storage;

}

export default pagesRegistry;
