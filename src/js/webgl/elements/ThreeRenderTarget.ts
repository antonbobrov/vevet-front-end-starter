import { Module, merge } from 'vevet';
import {
    Scene, WebGLRenderTarget, LinearFilter, WebGLRenderTargetOptions,
} from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { ThreeCamera3D, IThreeCamera3D } from '../base/ThreeCamera3D';
import ThreeScene from '../base/ThreeScene';
import { threeJS } from '../threeJS';
import ThreeBase from '../base/ThreeBase';
import app from '../../app/app';

const { viewport } = app;



export namespace IThreeRenderTarget {

    export interface Properties extends Module.Properties {

        /**
         * @description DOM element acoording to which sizes of the renderer will be calculated
         */
        el?: false | HTMLElement;

        /**
         * @description Autorendering in THREE.js
         */
        autoRender?: boolean;
        /**
         * @description Custom device pixel ratio for a better quality
         */
        dpr?: false | number;

        /**
         * @description Three.js Vevet module.
         */
        three?: ThreeBase;
        /**
         * @description Use Effect Composer
         */
        useComposer?: boolean;
        /**
         * @description Use GammaCorrectionShader
         */
        useGammaCorrection?: boolean;
        /**
         * @description Camera Settings
         */
        cameraSettings?: CameraSettings;
        /**
         * @description Render Settings
         */
        renderSettings?: WebGLRenderTargetOptions;

    }

    export interface CameraSettings {
        far: number;
    }

}



export class ThreeRenderTarget extends Module {

    protected _prop: IThreeRenderTarget.Properties;

    // @ts-ignore
    get defaultProp (): IThreeRenderTarget.Properties {
        return merge(super.defaultProp, {
            el: false,
            autoRender: true,
            dpr: false,
            three: threeJS,
            useComposer: false,
            useGammaCorrection: false,
            cameraSettings: {
                far: 800,
            },
            renderSettings: {},
        });
    }

    // @ts-ignore
    get prop (): IThreeRenderTarget.Properties {
        return this._prop;
    }



    protected _scene: Scene;
    get scene () {
        return this._scene;
    }

    protected _camera: IThreeCamera3D.Returns;
    get camera () {
        return this._camera.camera;
    }

    protected _renderer: WebGLRenderTarget;
    get renderer () {
        return this._renderer;
    }

    protected _threeEvents: string[];

    protected _useComposer: boolean;
    protected _composer: EffectComposer;



    constructor (data?: IThreeRenderTarget.Properties) {
        super(data);
    }

    // Extra Constructor
    protected _extra () {

        super._extra();

        // vars
        this._threeEvents = [];
        this._useComposer = this._prop.useComposer;

        // create a scene and a camera
        this._scene = ThreeScene();
        this._camera = ThreeCamera3D(this._prop.el, this._prop.cameraSettings.far);

        // create a renderer
        this._renderer = this._createRenderTarget();

        // composer
        if (this._useComposer) {
            this._createEffectComposer();
        }

    }



    /**
     * Create a render target.
     */
    _createRenderTarget () {

        const sizes = this._getRenderSizes();

        const renderer = new WebGLRenderTarget(
            sizes.width, sizes.height,
            {
                minFilter: LinearFilter,
                magFilter: LinearFilter,
                ...this.prop.renderSettings,
            },
        );

        return renderer;

    }

    protected _getRenderSizes () {

        const dpr = this._prop.dpr ? this._prop.dpr : viewport.dprMobile;
        const width = this._prop.el ? this._prop.el.clientWidth : viewport.size[0];
        const height = this._prop.el ? this._prop.el.clientHeight : viewport.size[1];

        return {
            width: width * dpr,
            height: height * dpr,
        };

    }

    /**
     * Enable/disable auto rendering.
     */
    public toggleAutoRender (bool: boolean) {

        this._prop.autoRender = bool;

    }



    /**
     * Create an effect composer.
     */
    _createEffectComposer () {

        this._composer = new EffectComposer(this.prop.three.renderer, this._renderer);

        const renderPass = new RenderPass(this._scene, this.camera);
        this._composer.addPass(renderPass);

        if (this.prop.useGammaCorrection) {
            const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
            this._composer.addPass(gammaCorrectionPass);
        }

        // anti-aliasing
        this._createComposerAntialiasing();

    }

    /**
     * Apply anti-aliasing.
     */
    _createComposerAntialiasing () {

        const sizes = this._getRenderSizes();

        const pass = new SMAAPass(sizes.width, sizes.height);
        this._composer.addPass(pass);

    }



    /**
     * Set events.
     */
    protected _setEvents () {

        // on resize
        const resizeID = this.prop.three.on('resize', () => {
            this._updateSizes();
        });
        this._threeEvents.push(resizeID);

        // on render
        const renderID = this.prop.three.on('prerender', () => {
            if (!this._prop.autoRender) {
                return;
            }
            this.render();

        });
        this._threeEvents.push(renderID);

    }

    /**
     * Update render target sizes
     */
    protected _updateSizes () {

        const sizes = this._getRenderSizes();
        this._renderer.setSize(sizes.width, sizes.height);
        this._camera.resize();

    }



    public render () {

        const threeRenderer = this._prop.three.renderer;

        if (this._useComposer) {
            this._composer.renderToScreen = false;
            this._composer.render();
        }
        else {
            threeRenderer.autoClear = true;
            threeRenderer.setRenderTarget(this._renderer);
            threeRenderer.render(this._scene, this._camera.camera);
            threeRenderer.setRenderTarget(null);
        }

    }



    _destroy () {

        super._destroy();

        this._scene = null;

        this._camera = null;

        this._renderer.dispose();
        this._renderer = null;

        for (let i = 0; i < this._threeEvents.length; i++) {
            this._prop.three.remove(this._threeEvents[i]);
        }

    }



}
