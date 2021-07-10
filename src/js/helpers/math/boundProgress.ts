export function boundProgress (
    progress: number,
    scope = [0, 1],
) {

    if (progress < scope[0]) {
        return scope[0];
    }
    if (progress > scope[1]) {
        return scope[1];
    }

    return progress;

}
