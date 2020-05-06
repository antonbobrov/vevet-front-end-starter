import DefaultPage from './default-page';

class HomePage extends DefaultPage {

    protected _canBeShown = false;



    create(ajax = false) {

        if (!super.create(ajax)) {
            return false;
        }

        return this;

    }


    
}

const homePage = new HomePage({
    name: 'home-page'
});

export default homePage;