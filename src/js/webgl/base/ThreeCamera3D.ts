import { PerspectiveCamera } from 'three';

export namespace IThreeCamera3D {

    export interface Returns {
        camera: PerspectiveCamera;
        resize: Function;
    }

}



export function ThreeCamera3D (
    outer: false | Element = false,
    perspective = 800,
    near = 1,
    far = 10000,
) {

    const aspectRatio = getAspectRatio();
    const fieldOfView = getFOV();
    const nearPlane = near;
    const farPlane = far;

    const camera = new PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane,
    );
    camera.position.set(0, 0, perspective);



    function getFOV () {
        // eslint-disable-next-line no-mixed-operators
        return 180 * (2 * Math.atan(getHeight() / 2 / perspective)) / Math.PI;
    }

    function getAspectRatio () {
        return getWidth() / getHeight();
    }

    function getWidth () {
        if (outer) {
            return outer.clientWidth;
        }
        return window.innerWidth;
    }

    function getHeight () {
        if (outer) {
            return outer.clientHeight;
        }
        return window.innerHeight;
    }



    function resize () {

        camera.fov = getFOV();
        camera.aspect = getAspectRatio();
        camera.updateProjectionMatrix();

    }
    resize();



    return {
        camera,
        resize: resize.bind(this),
    };

}
