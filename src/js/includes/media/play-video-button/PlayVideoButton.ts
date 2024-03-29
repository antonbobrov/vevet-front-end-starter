import { customElement, LitElement, property } from 'lit-element';
import setEnterClickListener from '../../../helpers/listeners/setEnterClickListener';
import { enableTabIndex } from '../../../layout/scroll/keyboard/tabindex';
import settings from './settings';
import loadVideoInPopup, { VideoInPopupSourceEnum } from '../popup/loadVideoInPopup';

const { tagName } = settings;

@customElement(tagName)
export default class PlayVideoButton extends LitElement {
    @property({
        attribute: 'source',
    }) source: VideoInPopupSourceEnum;
    @property({
        attribute: 'src',
    }) src: string;

    createRenderRoot () {
        return this;
    }

    firstUpdated () {
        this.classList.add(tagName);
        enableTabIndex(this);

        this.addEventListener('click', () => {
            loadVideoInPopup(this.source, this.src);
        });
        setEnterClickListener(this, () => {
            loadVideoInPopup(this.source, this.src);
        });
    }
}
