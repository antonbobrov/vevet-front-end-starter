import { Module, merge, TimelineModule } from 'vevet';
import {
    Scene,
    Texture,
    Mesh,
    PlaneBufferGeometry,
    BufferGeometry,
    MeshBasicMaterial,
    ShaderMaterial,
    IUniform,
    Shader,
    Group,
} from 'three';
import ThreeBase from '../base/ThreeBase';
import { threeJS } from '../threeJS';



export namespace IThreePlane {

    export interface Properties extends Module.Properties {

        /**
         * Reference DOM element according to which
         * sizes of the plane will be calculated.
         * If false, the sizes will be equal to the three.js outer.
         */
        el?: false | Element;
        /**
         * Autorendering in THREE.js
         */
        autoRender?: boolean;

        /**
         * Three.js Vevet module.
         */
        three?: ThreeBase;
        /**
         * Three.js Scene.
         */
        scene?: Scene | Group | false;

        /**
         * Auto removing from the scene.
         */
         autoRemove?: boolean;
         /**
          * Auto resize on window resize
          */
         autoResize?: boolean;
        /**
         * Auto-rendering the position of the mesh according to
         * the reference DOM element's coordinates.
         */
        renderPosition?: boolean;

        /**
         * Z-index of the plane.
         */
        zIndex?: number;
        /**
         * Z rotation.
         */
        zRotate?: number;

        /**
         * Three.js texture.
         */
        texture?: false | Texture;
        /**
         * @description If the texture needs always to be updated
         */
        alwaysNeedsUpdate?: boolean;
        /**
         * Three.js material.
         */
        material?: any;
        /**
         * Material properties.
         */
        materialProp?: any;

        /**
         * Extend native Fragment Shader.
         */
        extendFragmentShader?: false | string;
        /**
         * Vertex shader.
         */
        vertexShader?: string;
        /**
         * Fragment shader.
         */
        fragmentShader?: string;

        /**
         * Shader uniforms.
         */
        uniformsData?: IThreePlane.UniformsData[];

    }

    export interface UniformsData {
        key: string;
        type: string;
        value: any;
    }

}



export class ThreePlane extends Module {

    protected _prop: IThreePlane.Properties;

    // @ts-ignore
    get defaultProp (): IThreePlane.Properties {
        return merge(super.defaultProp, {

            el: false,
            autoRender: true,

            three: threeJS,
            scene: threeJS.scene2d,

            autoRemove: false,
            autoResize: true,
            renderPosition: true,

            zIndex: 1,
            zRotate: 0,

            texture: false,
            alwaysNeedsUpdate: false,
            material: MeshBasicMaterial,
            materialProp: {},

            extendFragmentShader: false,
            vertexShader: '',
            fragmentShader: '',

            uniformsData: [],

        });
    }

    // @ts-ignore
    get prop (): IThreePlane.Properties {
        return this._prop;
    }



    protected _el: Element | false;
    protected _startSize: number[];
    protected _scale: number[];

    protected _threeEvents: string[];
    protected _renderedFrames = 0;

    protected _texture: false | Texture;
    get texture () {
        return this._texture;
    }

    protected _geometry: BufferGeometry;
    get geometry () {
        return this._geometry;
    }

    protected _material: any;
    get material () {
        return this._material;
    }

    protected _mesh: Mesh;
    get mesh () {
        return this._mesh;
    }

    protected _data: IThreePlane.UniformsData[];
    protected _uniforms: {
        [uniform: string]: IUniform;
    } = {};

    protected _onScene: boolean;

    /**
     * Rendered for the last time.
     * Used together with prop.renderPosition.
     */
    protected _lastTimeRenderedPosition: boolean;



    protected setDefaultProperties () {
        this._startSize = [0, 0];
        this._scale = [1, 1];
        this._threeEvents = [];
        this._texture = false;
        this._material = MeshBasicMaterial;
        this._onScene = true;
        this._lastTimeRenderedPosition = false;
    }



    constructor (data?: IThreePlane.Properties) {
        super(data);
    }

    // Extra Constructor
    protected _extra () {

        super._extra();

        this.setDefaultProperties();

        // get the element
        this._el = this.prop.el;

        // set data
        this._data = this.prop.uniformsData;

    }



    // Create a Vevet event
    on (
        target: ('material' | 'geometry' | 'mesh' | 'done' | string),
        callback: (...params: any[]) => any,
        prop?: any,
    ) {
        return super.on(target, callback, prop);
    }



    // Here you can set additional events
    protected _setEvents () {

        // create three.js base
        this._createTHREE();

    }


    /**
     * Create Three.js base.
     */
    protected _createTHREE () {

        this._setStartSize();

        // create a texture
        this._createTexture();

        // create geometry
        this._createGeometry();

        // create material
        this._createMaterial();

        // create a mesh
        this._createMesh();

        // resize mesh
        this.resize();
        if (this._prop.autoResize) {
            this._setResize();
        }

        // append to the scene
        if (this.prop.scene) {
            this.prop.scene.add(this._mesh);
        }

        // render
        this._setRendering();

        // when all processes are done
        this.lbt('done');

    }



    /**
     * Calculate sizes at the beginning.
     */
    protected _setStartSize () {

        const el = this._el;
        let width = 0;
        let height = 0;

        const { three } = this.prop;

        if (el) {
            width = el.clientWidth;
            if (width === 0) {
                width = three.width;
            }
            height = el.clientHeight;
            if (height === 0) {
                height = three.height;
            }
        }
        else {
            width = three.width;
            height = three.height;
        }

        this._startSize = [width, height];

    }

    /**
     * Scale mesh on resize.
     */
    public resize () {

        let startWidth = this._startSize[0];
        let startHeight = this._startSize[1];

        const el = this._el;

        // get current height and width
        let width = 0;
        let height = 0;
        if (el) {
            width = el.clientWidth;
            height = el.clientHeight;
        }
        else {
            width = this.prop.three.width;
            height = this.prop.three.height;
        }

        // if start values are zero
        if (startWidth === 0) {
            startWidth = width;
            this._startSize[0] = width;
        }
        if (startHeight === 0) {
            startHeight = height;
            this._startSize[1] = height;
        }

        // calculate scaling
        const scaleX = width / startWidth;
        const scaleY = height / startHeight;
        this._scale = [scaleX, scaleY];

        // apply scaling
        const mesh = this._mesh;
        mesh.scale.x = scaleX;
        mesh.scale.y = scaleY;

    }

    /**
     * Set resize events.
     */
    protected _setResize () {

        this._threeEvents.push(
            this.prop.three.on('resize', this.resize.bind(this)),
        );

    }



    /**
     * Create a texture.
     */
    protected _createTexture () {

        const { texture } = this.prop;
        if (texture) {
            this._texture = texture;
        }

    }

    /**
     * Create a geometry.
     */
    protected _createGeometry () {

        // get dimensions
        const width = this._startSize[0];
        const height = this._startSize[1];

        const geometry = new PlaneBufferGeometry(width, height, 150, 150);
        this._geometry = geometry;

        // callbacks on geometry created
        this.lbt('geometry');

    }



    /**
     * Create a material.
     */
    protected _createMaterial () {

        const prop = this._prop;

        // extend native fragment shader
        const Material = this._prop.material;
        if (!(Material instanceof ShaderMaterial)) {

            const materialProp: any = { ...prop.materialProp };
            if (this._texture) {
                materialProp.map = this._texture;
            }

            this._material = new Material(materialProp);

        }
        else {

            let uniforms = this._getMaterialUniforms();

            // apply a texture
            if (this._texture) {
                uniforms = Object.assign(uniforms, {
                    map: {
                        type: 't',
                        value: this._texture,
                    },
                });
            }

            // create the material
            this._material = new ShaderMaterial({
                vertexShader: prop.vertexShader,
                fragmentShader: prop.fragmentShader,
                uniforms,
                ...this._prop.materialProp,
            });

            // set uniforms
            this._uniforms = Material.uniforms;

        }

        // apply a texture to the material
        if (this._texture) {
            Material.map = this._texture;
        }

        // set on before compile
        if (!(Material instanceof ShaderMaterial)) {
            if (prop.extendFragmentShader) {
                this._setMaterialDataOnExtendedMaterial();
            }
        }

        // callbacks on material created
        this.lbt('material');

    }

    /**
     * Get material uniforms.
     */
    protected _getMaterialUniforms () {

        const uniforms: any = {};

        this._data.forEach((obj) => {
            uniforms[obj.key] = {
                type: obj.type,
                value: obj.value,
            };
        });

        return uniforms;

    }

    /**
     * Set material data on Materials extending the native fragment shader.
     */
    protected _setMaterialDataOnExtendedMaterial () {

        // material uniforms to user data
        this._setMaterialUserData();
        // set a "before compile event"
        this._setMaterialOnBeforeCompile();

    }

    /**
     * Material uniforms to user data.
     */
    protected _setMaterialUserData () {

        const material = this._material;
        this._data.forEach((obj) => {
            material.userData[obj.key] = {
                type: obj.type,
                value: obj.value,
            };
        });

    }

    /**
     * Set material OnBeforeCompile.
     * There might be cases when hashes of the materials could be the same
     * while the callbacks are different.
     * That's why it has sense to change the callback in each new material.
     */
    protected _setMaterialOnBeforeCompile () {

        this._material.onBeforeCompile = (shader: any) => {
            this._onMaterialBeforeCompile(shader);
        };

    }

    /**
     * Before compiling a material.
     * @param { Shader } shader
     */
    protected _onMaterialBeforeCompile (shader: Shader) {

        const { extendFragmentShader } = this.prop;
        if (extendFragmentShader) {

            // set uniforms in shaders
            this._setShaderUniforms(shader);

            // the rest is the same
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                extendFragmentShader,
            );

        }

    }

    /**
     * Set uniforms in shaders.
     * @param { Shader } shader
     */
    protected _setShaderUniforms (shader: Shader) {

        const material = this._material;

        this._data.forEach((obj) => {
            shader.uniforms[obj.key] = material.userData[obj.key];
            shader.fragmentShader = `uniform ${obj.type} ${obj.key}; \n ${shader.fragmentShader}`;
            shader.vertexShader = `uniform ${obj.type} ${obj.key}; \n ${shader.vertexShader}`;
        });

        this._uniforms = material.userData;

    }



    /**
     * Create a mesh.
     */
    protected _createMesh () {

        const mesh = new Mesh(this._geometry, this._material);
        this._mesh = mesh;
        mesh.position.set(0, 0, this.prop.zIndex);

        // apply rotation
        mesh.rotation.z = this._prop.zRotate;

        // callbacks on mesh created
        this.lbt('mesh');

    }



    /**
     * Remove Three.js vevet module events.
     */
    removeThreeEvents () {

        this._threeEvents.forEach((id) => {
            this.prop.three.remove(id);
        });

    }

    destroy () {

        super.destroy();

        this.removeThreeEvents();

        if (this._geometry) {
            this._geometry.dispose();
        }
        if (this._material) {
            this._material.dispose();
        }
        if (this._texture) {
            this._texture.dispose();
        }

        if (this.prop.scene) {
            this.prop.scene.remove(this._mesh);
        }

    }



    /**
     * Set rendering.
     */
    _setRendering () {

        // add rendering event
        if (this.prop.autoRender) {
            this._threeEvents.push(
                this.prop.three.on('prerender', this.render.bind(this)),
            );
        }

    }



    /**
     * Render the object.
     */
    render () {

        if (this.prop.renderPosition) {
            this.renderPosition();
        }
        this._renderTexture();

        this._renderedFrames += 1;

    }

    /**
     * Render the object's position.
     */
    public renderPosition (
        force = false,
    ) {

        const prop = this._prop;
        const { three } = prop;
        const mesh = this._mesh;
        const { scene } = this._prop;

        if (!force) {
            if (!prop.renderPosition) {
                if (this._lastTimeRenderedPosition) {
                    return;
                }
                this._lastTimeRenderedPosition = true;
            }
            else {
                this._lastTimeRenderedPosition = false;
            }
        }

        // get position
        const bounding = this._getBounding();
        const position = this._getPosition(bounding);

        // show/hide on scene
        if (this._prop.autoRemove) {
            if (
                bounding.right < 0
                || bounding.bottom < 0
                || bounding.top > three.height
                || bounding.left > three.width
            ) {
                position.x = -5000;
                position.y = -5000;
                if (this._onScene) {
                    if (scene) {
                        scene.remove(mesh);
                    }
                    this._onScene = false;
                    mesh.matrixAutoUpdate = false;
                }
            }
            else if (!this._onScene) {
                if (scene) {
                    scene.add(mesh);
                }
                this._onScene = true;
                mesh.matrixAutoUpdate = true;
            }
        }

        // apply
        mesh.position.x = position.x;
        mesh.position.y = position.y;

    }

    /**
     * Get the object's bounding.
     */
    _getBounding () {

        // get outer element
        let el: Element;
        if (this._el) {
            el = this._el;
        }
        else {
            el = this._prop.three.outer;
        }

        // get bounding of the DOM element
        const bounding = el.getBoundingClientRect();

        return bounding;

    }

    /**
     * Get the object's position.
     */
    _getPosition (bounding: ClientRect) {

        const prop = this._prop;
        const { three } = prop;

        // calculate translates top/left coordinates
        const xStart = (three.width - bounding.width) / -2;
        const yStart = (three.height - bounding.height) / 2;

        // add bounding
        const x = xStart + bounding.left;
        const y = yStart - bounding.top;

        return {
            x,
            y,
        };

    }

    /**
     * Render the texture
     */
    protected _renderTexture () {

        if (!this._prop.alwaysNeedsUpdate) return;
        if (this._texture) {
            this._texture.needsUpdate = true;
        }

    }



    public hide (duration: number) {

        return new Promise((resolve: (...args: any) => void) => {
            const timeline = new TimelineModule();
            timeline.on('progress', (data) => {
                this.setAlpha(1 - data.se);
            });
            timeline.on('end', () => {
                resolve();
            });
            timeline.play({
                duration,
            });
        });

    }

    public show (duration: number) {

        return new Promise((resolve: (...args: any) => void) => {
            const timeline = new TimelineModule();
            timeline.on('progress', (data) => {
                this.setAlpha(data.se);
            });
            timeline.on('end', () => {
                resolve();
            });
            timeline.play({
                duration,
            });
        });

    }

    public setAlpha (alpha: number) {

        // @ts-ignore
        this.mesh.material.opacity = alpha;

    }



}
