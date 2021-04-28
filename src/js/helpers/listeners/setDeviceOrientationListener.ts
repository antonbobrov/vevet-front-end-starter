import { IAddEventListener, addEventListener } from 'vevet-dom';

export function setDeviceOrientationListener (
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
                typeof (DeviceMotionEvent.requestPermission) === 'function'
            ) {
                DeviceMotionEvent.requestPermission()
                    .then((response) => {
                        if (response === 'granted') {
                            const listener = addEventListener(
                                // @ts-ignore
                                window, 'deviceorientation', callback,
                            );
                            resolve(listener);
                        }
                    });

            }
            else {
                const listener = addEventListener(
                    // @ts-ignore
                    window, 'deviceorientation', callback,
                );
                resolve(listener);
            }
        }

    });

}
