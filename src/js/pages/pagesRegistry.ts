import { PageModule } from 'vevet';
import { homePage } from './list/home-page';
import { createPage } from './createPage';
import { pageAjax } from './pageAjax';

export function pagesRegistry () {

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
