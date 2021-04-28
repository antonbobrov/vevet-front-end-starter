import { OrthographicCamera } from 'three';

export namespace IThreeCamera2D {

    export interface Returns {
        camera: OrthographicCamera;
        resize: Function;
    }

}



export function ThreeCamera2D (outer: false | Element = false) {

    let width: number;
    let height: number;
    updateSizes();

    const camera = new OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        -20, 10000,
    );



    function resize () {

        updateSizes();

        camera.left = width / -2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = height / -2;

        camera.updateProjectionMatrix();

    }
    resize();

    function updateSizes () {

        width = window.innerWidth;
        height = window.innerHeight;
        if (outer) {
            width = outer.clientWidth;
            height = outer.clientHeight;
        }

    }



    return {
        camera,
        resize: resize.bind(this),
    };

}
