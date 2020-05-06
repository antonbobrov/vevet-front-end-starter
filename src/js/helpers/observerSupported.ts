const observerSupported = function(): boolean {

    if (
        !('IntersectionObserver' in window) &&
        !('IntersectionObserverEntry' in window)
    ) {
        return false;
    }

    return true;

};

export default observerSupported;