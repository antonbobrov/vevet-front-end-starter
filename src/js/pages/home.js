import Default from './_default';

class Home extends Default {



    create(ajax) {

        if (!super.create(ajax)) {
            return false;
        }

    }



}

var home = new Home({
    name: 'home'
});

export default home;