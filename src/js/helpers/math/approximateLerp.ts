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
