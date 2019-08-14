import { Slider, Text } from '../modules/vevet';
import app from '../modules/app';
import Default from './_default';

class Home extends Default {



    // Create the page

    create(ajax) {

        super.create(ajax);

    }

    show() {

        super.show();

    }

    hide() {

        super.hide();

    }

    destroy() {

        super.destroy();

    }



}

var home = new Home({
    v: app,
    name: 'home'
});

export default home;