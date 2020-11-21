import { ScrollModule } from 'vevet';
import { SectionScroll } from '../sectionScroll/SectionScroll';

export function isCustomScroll (val: any) {
    if (
        (val instanceof ScrollModule)
        || (val instanceof SectionScroll)
    ) {
        return true;
    }
    return false;
}

export type CustomScrollType = ScrollModule | SectionScroll;
