export function inScope (
    progress: number,
    scope = [0, 1],
) {

    return progress >= scope[0] && progress <= scope[1];

}
