import Default from './default';

class Home extends Default {



    create(ajax) {

        if (!super.create(ajax)) {
            return false;
        }

    }



}

const home = new Home({
    name: 'home'
});

export default home;