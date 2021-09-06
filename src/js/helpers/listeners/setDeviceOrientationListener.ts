import { IAddEventListener, addEventListener } from 'vevet-dom';

export default function setDeviceOrientationListener (
    callback: (e: DeviceOrientationEvent) => void,
) {
    return new Promise((
        resolve: (listener: IAddEventListener) => void,
    ) => {
        // device orientation event
        if (
            typeof (DeviceMotionEvent) !== 'undefined'
        ) {
            if (
                // @ts-ignore
                typeof (DeviceMotionEvent.requestPermission) === 'function'
            ) {
                // @ts-ignore
                DeviceMotionEvent.requestPermission()
                    .then((response: string) => {
                        if (response === 'granted') {
                            const listener = addEventListener(
                                // @ts-ignore
                                window, 'deviceorientation', callback,
                            );
                            resolve(listener);
                        }
                    });
            } else {
                const listener = addEventListener(
                    // @ts-ignore
                    window, 'deviceorientation', callback,
                );
                resolve(listener);
            }
        }
    });
}
