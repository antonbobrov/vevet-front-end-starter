export function observerSupported (): boolean {

    if (
        !('IntersectionObserver' in window)
        && !('IntersectionObserverEntry' in window)
    ) {
        return false;
    }

    return true;

}
