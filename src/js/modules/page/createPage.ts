import { PageModule } from 'vevet';
import app from '../../v/app';
import { pageSettings } from '../../settings';

// create page according to the defined type

export function createPage () {

    const page = app.page[0];



    // check existing pages

    let existingPage: false | PageModule = false;
    let defaultPage: false | PageModule = false;

    for (let i = 0; i < app.vevetPages.length; i++) {
        const p = app.vevetPages[i];
        if (p.name === page) {
            existingPage = p;
        }
        if (p.name === pageSettings.default) {
            defaultPage = p;
        }
    }



    // if the default page doesn't exist
    if (!existingPage) {
        if (!defaultPage) {
            throw new Error("Default page doesn't exist!");
        }
        else {
            defaultPage.create();
        }
    }
    else {
        existingPage.create();
    }



}
