import { WebGLRenderer } from 'three';
import app from '../../app/app';

export default function ThreeRenderer (canvas: HTMLCanvasElement, outer: Element) {

    const { viewport } = app;

    const renderer = new WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        depth: false,
    });
    renderer.physicallyCorrectLights = true;

    const DPR = viewport.dpr;
    renderer.setPixelRatio(DPR);
    renderer.setSize(outer.clientWidth, outer.clientHeight);



    function resize () {

        const width = outer.clientWidth;
        const height = outer.clientHeight;

        // change canvas sizes
        canvas.width = width;
        canvas.height = height;

        // update renderer's sizes
        renderer.setSize(width, height);

    }
    resize();



    function destroy () {

        renderer.dispose();

    }



    return {
        renderer,
        resize: resize.bind(this),
        destroy: destroy.bind(this),
    };

}
