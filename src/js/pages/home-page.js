import DefaultPage from './default-page';

class HomePage extends DefaultPage {



    create(ajax) {

        if (!super.create(ajax)) {
            return false;
        }

    }


    
}

const homePage = new HomePage({
    name: 'home-page'
});

export default homePage;