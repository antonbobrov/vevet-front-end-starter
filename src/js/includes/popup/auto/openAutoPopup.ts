import popupAuto from './popupAuto';

export default function openAutoPopup (
    selector: string,
) {

    popupAuto.show({
        selector,
        types: ['auto'],
        append: true,
    });

}
