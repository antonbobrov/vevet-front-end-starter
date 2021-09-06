import {
    Module, merge, Event, FrameModule,
} from 'vevet';
import { selectOne } from 'vevet-dom';

import { Scene, WebGLRenderer } from 'three';
import ThreeScene from './ThreeScene';
import ThreeRenderer from './ThreeRenderer';
import { ThreeCamera3D, IThreeCamera3D } from './ThreeCamera3D';
import { ThreeCamera2D, IThreeCamera2D } from './ThreeCamera2D';
import onResize from '../../app/onResize';
import { IDestroyable } from '../../commonTypes';

const resizeTimeout = 150;
const type2d = '2d';
const type3d = '3d';
const typeAll = '2d,3d';



export namespace IThreeBase {

    export interface Properties extends Module.Properties {
        outerSelector?: string | HTMLElement | Element;
        autoplay?: boolean;
        cameras?: '2d' | '3d' | '2d,3d';
        cameraFar?: number;
    }

}


class ThreeBase extends Module {
    protected _prop: IThreeBase.Properties;

    // @ts-ignore
    get defaultProp (): IThreeBase.Properties {
        // @ts-ignore
        return merge(super.defaultProp, {
            outerSelector: '#three-js',
            autoplay: false,
            cameras: '2d',
            cameraFar: 800,
        });
    }

    // @ts-ignore
    get prop (): IThreeBase.Properties {
        return this._prop;
    }


    protected _viewportEvent: IDestroyable;

    protected _frame: FrameModule;

    protected _noRender = false;
    set noRender (val: boolean) {
        this._noRender = val;
    }

    protected _canvas: HTMLCanvasElement;
    get canvas () {
        return this._canvas;
    }

    protected _outer: Element;
    get outer () {
        return this._outer;
    }

    protected _renderer: {
        renderer: WebGLRenderer;
        resize: Function;
        destroy: Function;
    };
    get renderer () {
        return this._renderer.renderer;
    }

    protected _scene2d: Scene;
    get scene2d () {
        return this._scene2d;
    }

    protected _scene3d: Scene;
    get scene3d () {
        return this._scene3d;
    }

    protected _camera2d: IThreeCamera2D.Returns;
    get camera2d () {
        return this._camera2d.camera;
    }

    protected _camera3d: IThreeCamera3D.Returns;
    get camera3d () {
        return this._camera3d.camera;
    }

    protected _width: number;
    get width () {
        return this._width;
    }
    protected _height: number;
    get height () {
        return this._height;
    }



    constructor (data: IThreeBase.Properties) {
        super(data);
    }

    // Extra Constructor
    protected _extra () {
        super._extra();

        // default vars
        this._width = 1;
        this._height = 1;

        // get the outer element
        this._outer = selectOne(this._prop.outerSelector);

        // get canvas
        this._getCanvas();

        const cameraType = this._prop.cameras;

        // CREATE SCENES
        if (cameraType === type2d || cameraType === typeAll) {
            this._scene2d = ThreeScene();
        }
        if (cameraType === type3d || cameraType === typeAll) {
            this._scene3d = ThreeScene();
        }

        // create a renderer
        this._renderer = ThreeRenderer(this._canvas, this.outer);

        // CREATE CAMERAS
        if (cameraType === type2d || cameraType === typeAll) {
            this._camera2d = ThreeCamera2D();
        }
        if (cameraType === type3d || cameraType === typeAll) {
            this._camera3d = ThreeCamera3D(this.outer, this._prop.cameraFar);
        }

        // create an animation frame
        this._frame = new FrameModule({
            fps: 90,
        });
        this._frame.on('', () => {
            this.render();
        });

        // render for the first time
        this.render();
    }



    on (
        target: ('frame' | 'afterrender' | 'prerender' | 'resize' | 'changeProp'),
        callback: (...params: any[]) => any,
        prop: Event.EventObjSettings = {},
    ) {
        return super.on(target, callback, prop);
    }



    // Get or create a canvas
    protected _getCanvas () {
        let canvas = selectOne('canvas', this.outer);
        if (canvas == null) {
            canvas = document.createElement('canvas');
            this.outer.appendChild(canvas);
        }

        if (canvas instanceof HTMLCanvasElement) {
            this._canvas = canvas;
        }

        // event on context lost
        canvas.addEventListener('webglcontextlost', () => {
            throw new Error('Three.JS Webgl Context Lost');
        }, false);
    }



    // Set Events
    protected _setEvents () {
        this._viewportEvent = onResize(
            this.resize.bind(this),
            'Three.JS',
            resizeTimeout,
        );

        this.resize();

        this.on('changeProp', this.resize.bind(this));
    }

    // When the window is resized
    public resize () {
        // update sizes
        this._width = this._outer.clientWidth;
        this._height = this._outer.clientHeight;

        // resize renderer and camera
        this._renderer.resize();

        // resize camera
        const cameraType = this._prop.cameras;
        if (cameraType === type2d || cameraType === typeAll) {
            this._camera2d.resize();
        }
        if (cameraType === type3d || cameraType === typeAll) {
            this._camera3d.resize();
        }

        // launch resize events
        this.lbt('resize');

        // launch animation if possible
        if (this._prop.autoplay) {
            this.play();
        }
    }



    /**
     * Play the animation frame
     */
    play () {
        this._frame.play();
    }

    /**
     * Pause the animation frame
     */
    pause () {
        this._frame.pause();
    }



    // RENDERING

    render () {
        // launch rendering events
        this.lbt('frame');
        this.lbt('prerender');

        // render webgl
        if (!this._noRender) {
            // clear
            this.renderer.autoClear = false;
            this.renderer.clear();
            this.renderer.clearDepth();

            // render
            const cameraType = this._prop.cameras;
            if (cameraType === type2d) {
                this.renderer.render(this.scene2d, this.camera2d);
            } else if (cameraType === type3d) {
                this.renderer.render(this.scene3d, this.camera3d);
            } else if (cameraType === typeAll) {
                this.renderer.render(this.scene3d, this.camera3d);
                this.renderer.autoClear = false;
                this.renderer.render(this.scene2d, this.camera2d);
            }
        }

        this.lbt('afterrender');
    }



    public destroy () {
        this._renderer.destroy();
        if (this._camera2d) {
            this._camera2d.destroy();
        }
        if (this._camera3d) {
            this._camera3d.destroy();
        }

        this._viewportEvent.destroy();
    }
}


export default ThreeBase;
