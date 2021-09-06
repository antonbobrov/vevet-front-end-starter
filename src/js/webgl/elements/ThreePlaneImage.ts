/* eslint-disable no-mixed-operators */

import { merge } from 'vevet';
import {
    CubeUVRefractionMapping, CanvasTexture, Texture, LinearFilter,
} from 'three';
import { getPos, PosRule } from 'get-image-pos';
import { ThreePlane, IThreePlane } from './ThreePlane';
import { loadImage } from '../../layout/image/imageLoader';
import Ctx2D from '../../helpers/canvas/Ctx2D';



export namespace IThreePlaneImage {

    export interface Properties extends IThreePlane.Properties {
        /**
         * @description Image Src
         */
        src?: string;
        /**
         * @description Resource
         */
        resource?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | false;
        /**
         * @description Image Size Algorithm
         */
        posRule?: false | PosRule;
    }

}



export class ThreePlaneImage extends ThreePlane {
    protected _prop: IThreePlaneImage.Properties;

    // @ts-ignore
    get defaultProp (): IThreePlaneImage.Properties {
        return merge(super.defaultProp, {
            src: '',
            resource: false,
            posRule: false,
        });
    }

    // @ts-ignore
    get prop (): IThreePlaneImage.Properties {
        return this._prop;
    }


    protected _isVideo: boolean;

    protected _resource: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | false;
    protected _loaded: boolean;
    protected _texture: Texture;
    protected _ctx2D: Ctx2D;



    constructor (data: IThreePlaneImage.Properties) {
        super(data);
    }

    // Extra Constructor
    protected _extra () {
        super._extra();

        this._resource = false;
        this._loaded = false;

        // add video texture size uniforms
        this._prop.uniformsData.push({
            key: 'u_video_repeatX',
            value: 1,
            type: 'float',
        });
        this._prop.uniformsData.push({
            key: 'u_video_repeatY',
            value: 1,
            type: 'float',
        });

        this._isVideo = false;
    }

    get loaded () {
        return this._loaded;
    }



    on (
        target: ('material' | 'geometry' | 'mesh' | 'done' | 'loaded' | string),
        callback: (...params: any[]) => any,
        prop?: any,
    ) {
        return super.on(target, callback, prop);
    }



    // Create THREE.JS base
    protected _createTHREE () {
        this._loadRes(super._createTHREE.bind(this));
    }

    /**
     * Load a resource.
     */
    protected _loadRes (callback: Function) {
        const res = this._prop.resource;

        if (res) {
            this._resource = res;
            this._resLoaded(callback);
        } else {
            loadImage(this._prop.src, (img) => {
                this._resource = img;
                this._resLoaded(callback);
            }, () => {
                this._resource = false;
                this._prop.materialProp.color = 0x595959;
                this._resLoaded(callback);
            });
        }
    }

    /**
     * @description When the resource is loaded.
     * @param {Function} callback
     */
    protected _resLoaded (callback: Function) {
        // events
        if (!this._loaded) {
            this.lbt('loaded');
        }
        this._loaded = true;

        // callback
        callback();
    }



    // Create a texture
    protected _createTexture () {
        const resource = this._resource;
        let texture: Texture;

        if (resource instanceof HTMLVideoElement) {
            this._isVideo = true;
            texture = new Texture(resource);
            texture.mapping = CubeUVRefractionMapping;
            resource.addEventListener('loadedmetadata', () => {
                this.resize();
            });
        } else if (resource instanceof HTMLCanvasElement) {
            texture = new CanvasTexture(resource);
            texture.mapping = CubeUVRefractionMapping;
        } else if (resource instanceof HTMLImageElement) {
            if (!this._prop.posRule) {
                texture = new Texture(resource);
            } else {
                texture = this._createCanvasTexture(resource);
            }
        } else {
            this._texture = undefined;
        }

        if (texture) {
            texture.needsUpdate = true;
            texture.magFilter = LinearFilter;
            texture.minFilter = LinearFilter;
            this._texture = texture;
        }
    }



    // Create a canvas texture
    protected _createCanvasTexture (resource: HTMLImageElement) {
        // create canvas
        this._ctx2D = new Ctx2D(this._prop.el);
        this._ctx2D.updateSize();
        this._drawCanvasTexture(resource);

        // create a texture
        const texture = new CanvasTexture(this._ctx2D.canvas);

        // add on resize
        this._threeEvents.push(this._prop.three.on('resize', () => {
            this._ctx2D.updateSize();
            this._drawCanvasTexture(resource);
            texture.needsUpdate = true;
        }));

        // return the texture
        return texture;
    }


    // Create a canvas texture
    protected _drawCanvasTexture (resource: HTMLImageElement) {
        // get context
        const ctx2D = this._ctx2D;
        const { width } = ctx2D;
        const { height } = ctx2D;
        const { ctx } = ctx2D;

        // clear
        ctx.clearRect(0, 0, width, height);

        // get size
        const size = getPos({
            source: resource,
            rule: this.prop.posRule || 'top-left',
            scale: 1,
            width,
            height,
        });

        // draw the image
        ctx.drawImage(
            resource,
            0, 0,
            size.sourceWidth, size.sourceHeight,
            size.x, size.y, size.width, size.height,
        );
    }



    public resize () {
        super.resize();

        this._resizeVideoTexture();
    }

    protected _resizeVideoTexture () {
        const video = this._prop.resource;
        if (!(video instanceof HTMLVideoElement)) {
            return;
        }
        const { texture } = this;
        if (!texture) {
            return;
        }

        const blockWidth = this._startSize[0] * this._scale[0];
        const blockHeight = this._startSize[1] * this._scale[1];

        const { videoWidth, videoHeight } = video;

        let repeatX: number;
        let repeatY: number;
        repeatX = blockWidth * videoHeight / (blockHeight * videoWidth);

        if (repeatX > 1) {
            // fill the width and adjust the height accordingly
            repeatX = 1;
            repeatY = blockHeight * videoWidth / (blockWidth * videoHeight);
            texture.repeat.set(repeatX, repeatY);
            texture.offset.y = (repeatY - 1) / 2 * -1;
        } else {
            // fill the height and adjust the width accordingly
            repeatX = blockWidth * videoHeight / (blockHeight * videoWidth);
            repeatY = 1;
            texture.repeat.set(repeatX, repeatY);
            texture.offset.x = (repeatX - 1) / 2 * -1;
        }

        const { userData } = this._material;
        if (userData.u_video_repeatX) {
            userData.u_video_repeatX.value = repeatX;
        }
        if (userData.u_video_repeatX) {
            userData.u_video_repeatY.value = repeatY;
        }
    }



    /**
     * Render the texture
     */
    protected _renderTexture () {
        super._renderTexture();

        if (this._isVideo) {
            if (this._renderedFrames % 2 === 0) {
                if (this._texture) {
                    this._texture.needsUpdate = true;
                }
            }
        }
    }



    /**
     * Destroy the plane
     */
    destroy () {
        if (this.prop.resource instanceof HTMLVideoElement) {
            try {
                this.prop.resource.pause();
            } catch (e) {
                //
            }
        }

        super.destroy();
    }
}
