import { selectAll } from 'vevet-dom';
import popupMenu from './popupMenu';

export default function setPopupMenuButtonEvents (
    outer: Element,
) {
    const buttons = selectAll('.js-menu-button', outer);
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (popupMenu) {
                popupMenu.toggle();
            }
        });
    });
}
