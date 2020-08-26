export default function getDOMDeepParentByInstance (
    ref: HTMLElement,
    instance: any,
    maxLevel = 9,
    currentLevel = 0,
): HTMLElement | false {

    if (currentLevel >= maxLevel) {
        return false;
    }
    currentLevel++;

    if (ref.parentElement instanceof HTMLElement) {

        if (ref.parentElement instanceof instance) {
            return ref.parentElement;
        }

        return getDOMDeepParentByInstance(ref.parentElement, instance, maxLevel, currentLevel);

    }

    return false;

}
