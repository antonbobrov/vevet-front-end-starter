const lerp = require('lerp');

export function approximateLerp (
    current: number,
    target: number,
    ease: number,
) {
    const l = lerp(current, target, ease);
    const diff = Math.abs(target - l);
    if (diff <= 0.001) {
        return target;
    }
    return l;
}

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

export function inScope (
    progress: number,
    scope = [0, 1],
) {
    return progress >= scope[0] && progress <= scope[1];
}
