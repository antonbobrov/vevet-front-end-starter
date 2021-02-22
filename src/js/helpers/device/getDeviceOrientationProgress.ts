import { mathScopeProgress } from 'vevet';



export function getDeviceOrientationGammaProgress (e: DeviceOrientationEvent) {

    const edge = 40;

    // get motion
    let leftToRight = e.gamma;
    if (leftToRight < edge * -1) {
        leftToRight = edge * -1;
    }
    else if (leftToRight > edge) {
        leftToRight = edge;
    }

    // calculate progress
    let progress = 0;
    if (leftToRight < 0) {
        progress = (1 - mathScopeProgress(leftToRight, [-edge, 0])) * -1;
    }
    else if (leftToRight > 0) {
        progress = mathScopeProgress(leftToRight, [0, edge]);
    }

    return progress;

}



export function getDeviceOrientationBetaProgress (e: DeviceOrientationEvent) {

    const edge = 60;

    // get motion
    let leftToRight = e.beta;
    if (leftToRight < edge * -1) {
        leftToRight = edge * -1;
    }
    else if (leftToRight > edge) {
        leftToRight = edge;
    }

    // calculate progress
    let progress = 0;
    if (leftToRight < 0) {
        progress = (1 - mathScopeProgress(leftToRight, [-edge, 0])) * -1;
    }
    else if (leftToRight > 0) {
        progress = mathScopeProgress(leftToRight, [0, edge]);
    }

    return progress;

}
