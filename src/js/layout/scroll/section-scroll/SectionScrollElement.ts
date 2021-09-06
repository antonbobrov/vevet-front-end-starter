import { LitElement } from 'lit-element';
import { ISectionScroll, SectionScroll } from './SectionScroll';

export default abstract class SectionScrollElement extends LitElement implements ISectionScroll.El {
    sectionScroll: ISectionScroll.ElProp;

    constructor () {
        super();

        SectionScroll.setDefaultElProp(this);
    }

    createRenderRoot () {
        return this;
    }
}
