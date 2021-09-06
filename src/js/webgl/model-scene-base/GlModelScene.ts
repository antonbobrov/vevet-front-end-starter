import { Scene, Texture, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mathScopeProgress, merge } from 'vevet';
import { addEventListener, IAddEventListener } from 'vevet-dom';
import app from '../../app/app';
import { layoutElements } from '../../helpers/dom-css/layoutElements';
import {
    InOutViewportCallbacks, setInOutViewportCallbacks,
} from '../../layout/scroll/intersection-observer/setInOutViewportCallbacks';
import { GUIType, minSiteGUIStep, siteGUI } from '../../siteGUI';
import { ThreePlane } from '../elements/ThreePlane';
import { ThreeRenderTarget } from '../elements/ThreeRenderTarget';
import { getRenderTargetDPR } from '../helpers/getRenderTargetDPR';
import { threeJS } from '../threeJS';
import { getModelBaseEnvronmentMap } from './getModelBaseEnvronmentMap';
import { GlModelSceneSpotLight } from './lights/GlModelSceneSpotLight';
import { GlModelSceneObj } from './GlModelSceneObj';
import { GlModelSceneAreaLight } from './lights/GlModelSceneAreaLight';
import { GlModelSceneAmbientLight } from './lights/GlModelSceneAmbientLight';
import { GlModelSceneProp } from './types';
import {
    getDeviceOrientationBetaProgress, getDeviceOrientationGammaProgress,
} from '../../helpers/listeners/getDeviceOrientationProgress';
import { Coords2D } from '../../commonTypes';
import { approximateLerp } from '../../helpers/math/approximateLerp';
import { setDeviceOrientationListener } from '../../helpers/listeners/setDeviceOrientationListener';
import onPageShown from '../../app/onPageShown';



const { viewport } = app;



interface Data<Prop> {
    prop: Prop;
    onLoadedCallback?: () => void;
    onRenderCallback?: () => void;
    onBeforeResizeCallback?: () => void;
}

export class GlModelScene<
    Prop extends GlModelSceneProp = GlModelSceneProp
> {

    // states
    protected _destroyed = false;
    protected _inOutEvents: InOutViewportCallbacks | false = false;
    protected _threeEvents: string[] = [];

    // base
    protected _renderTarget: ThreeRenderTarget;
    get renderTarget () {
        return this._renderTarget;
    }
    protected _scene: Scene;
    get scene () {
        return this._scene;
    }
    protected _plane: ThreePlane;
    get plane () {
        return this._plane;
    }

    // elements
    protected _model: false | GlModelSceneObj = false;
    get model () {
        return this._model;
    }
    protected _lightsCount = 0;
    protected _lights: (GlModelSceneSpotLight | GlModelSceneAreaLight | GlModelSceneAmbientLight)[] = [];

    // gui
    protected _guiFolder: GUIType | false = false;
    get guiFolder () {
        return this._guiFolder;
    }

    // events
    protected _listeners: IAddEventListener[] = [];

    // movement
    protected _targetMouse: Coords2D = {
        x: 0,
        y: 0,
    };

    // camera movement
    protected _currentMouseCameraPosition: Coords2D = {
        x: 0,
        y: 0,
    };



    // prop vars
    protected _prop: Data<Prop>['prop'];
    get prop () {
        return this._prop;
    }
    protected _onLoadedCallback: Data<Prop>['onLoadedCallback'];
    protected _onRenderCallback: Data<Prop>['onRenderCallback'];
    protected _onBeforeResizeCallback: Data<Prop>['onBeforeResizeCallback'];

    constructor ({
        prop,
        onLoadedCallback = () => {},
        onRenderCallback = () => {},
        onBeforeResizeCallback = () => {},
    }: Data<Prop>) {

        // update prop vars
        this._prop = prop;
        this._onLoadedCallback = onLoadedCallback;
        this._onRenderCallback = onRenderCallback;
        this._onBeforeResizeCallback = onBeforeResizeCallback;

        const defaultProp: Data<Prop>['prop'] = {
            parent: undefined,
            renderSettings: {
                useParentSize: true,
                renderPosition: true,
                useRenderIntersection: true,
                autorender: false,
                cameraFar: 800,
                autoShow: true,
                useOrbitControls: false,
            },
            name: 'gl model',
            paths: {
                objPath: '',
                objSrc: '',
                envMapSrc: '',
            },
            settings: {
                obj: {
                    defaultScale: {
                        desktop: 1,
                        tablet: 1,
                        mobile: 1,
                    },
                    defaultRotation: {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    defaultPosition: {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    mouseRotation: {
                        on: true,
                        ease: 0.1,
                        x: Math.PI / 4,
                        y: Math.PI / 4,
                    },
                    materialType: 'standard',
                    // @ts-ignore
                    materialProp: {
                        color: 0xff0000,
                        emissive: 0xff0000,
                    },
                },
                lights: [],
                scene: {
                    mouseCameraPosition: {
                        on: false,
                        staticLookAt: true,
                        ease: 0.1,
                        x: 0,
                        y: 0,
                    },
                },
            },
        } as Data<Prop>['prop'];
        this._prop = merge(defaultProp, this._prop);

        this._create();

    }



    /**
     * Create the scene
     */
    protected _create () {

        this._createBase();
        this._createModel();
        this._setEvents();

    }

    /**
     * Create base elements
     */
    protected _createBase () {

        this._createGUI();

        // create render target
        this._createRenderTarget();

        // vars
        const { _prop } = this;

        // set orbit controls
        if (_prop.renderSettings.useOrbitControls) {
            // eslint-disable-next-line no-new
            new OrbitControls(this._renderTarget.camera, layoutElements.app as HTMLElement);
        }

        // load environment map
        if (_prop.paths.envMapSrc) {
            getModelBaseEnvronmentMap(_prop.paths.envMapSrc).then((envMap: Texture) => {
                if (!this._destroyed) {
                    this._scene.environment = envMap;
                }
            });
        }

    }

    /**
     * Create GUI
     */
    protected _createGUI () {

        const { _prop } = this;
        const { settings } = _prop;

        // create a gui folder
        if (siteGUI) {
            try {
                this._guiFolder = siteGUI.addFolder(_prop.name);
            }
            catch (e) {
                // code
            }
        }

        const gui = this._guiFolder;
        if (gui) {

            // scene gui
            const sceneFolder = gui.addFolder('scene');

            // camera position
            const { mouseCameraPosition } = settings.scene;
            const mouseCameraPositionFolder = sceneFolder.addFolder('mouse camera position');
            mouseCameraPositionFolder.add(mouseCameraPosition, 'on');
            mouseCameraPositionFolder.add(mouseCameraPosition, 'staticLookAt');
            mouseCameraPositionFolder.add(mouseCameraPosition, 'ease', minSiteGUIStep, 0.25, minSiteGUIStep);
            mouseCameraPositionFolder.add(mouseCameraPosition, 'x', -0.25, 0.25, minSiteGUIStep);
            mouseCameraPositionFolder.add(mouseCameraPosition, 'y', -0.25, 0.25, minSiteGUIStep);

        }

    }

    /**
     * Create a render target
     */
    protected _createRenderTarget () {

        // vars
        const { _prop } = this;
        const { renderSettings } = _prop;

        // create a render target
        this._renderTarget = new ThreeRenderTarget({
            el: renderSettings.useParentSize ? _prop.parent : false,
            autoRender: renderSettings.autorender,
            dpr: getRenderTargetDPR(),
            cameraSettings: {
                far: renderSettings.cameraFar,
            },
        });
        // get its scene
        this._scene = this._renderTarget.scene;

        // create a plane for the renderTarget
        this._plane = new ThreePlane({
            el: renderSettings.useParentSize ? _prop.parent : false,
            scene: threeJS.scene3d,
            texture: this._renderTarget.renderer.texture,
            materialProp: {
                transparent: true,
                opacity: 0,
            },
            zIndex: 1,
            renderPosition: renderSettings.renderPosition,
        });

    }



    /**
     * Set scene events
     */
    protected _setEvents () {

        // rendering events
        this._threeEvents.push(threeJS.on('resize', this._updateSizes.bind(this), {
            timeout: 100,
        }));
        this._threeEvents.push(threeJS.on('prerender', this.render.bind(this)));

        this._setInOutEvents();

        // set movement listeners
        this._listeners.push(addEventListener(window, 'mousemove', this._handleMouseMove.bind(this)));

        // device orientation event
        setDeviceOrientationListener((e) => {
            this._handleDeviceOrientation(e);
        }).then((listener) => {
            this._listeners.push(listener);
        });

    }

    /**
     * Set in out events
     */
    protected _setInOutEvents () {

        // vars
        const { _prop } = this;
        const { renderSettings } = _prop;

        if (renderSettings.autorender) {
            return;
        }
        if (!renderSettings.useRenderIntersection) {
            return;
        }

        this._inOutEvents = setInOutViewportCallbacks(
            this._prop.parent,
            () => {
                this._renderTarget.prop.autoRender = true;
            },
            () => {
                this._renderTarget.prop.autoRender = false;
            },
        );

    }

    /**
     * Event on mouse move
     */
    protected _handleMouseMove (
        e: MouseEvent,
    ) {

        if (app.viewport.mobiledevice) {
            return;
        }

        this._targetMouse.x = mathScopeProgress(e.clientX, [app.viewport.size[0] / 2, app.viewport.size[0]]);
        this._targetMouse.y = mathScopeProgress(e.clientY, [app.viewport.size[1] / 2, app.viewport.size[1]]);

    }

    /**
     * On device orientation change
     */
    protected _handleDeviceOrientation (
        e: DeviceOrientationEvent,
    ) {

        if (!app.viewport.mobiledevice) {
            return;
        }

        const progressX = getDeviceOrientationGammaProgress(e);
        this._targetMouse.x = progressX * 1.25;

        const progressY = getDeviceOrientationBetaProgress(e);
        this._targetMouse.y = progressY * 1.25;

    }



    /**
     * Create Model
     */
    protected _createModel () {

        const { _prop } = this;
        const { renderSettings } = _prop;

        this._model = new GlModelSceneObj<Prop>({
            parent: _prop.parent,
            scene: this._scene,
            guiParent: this._guiFolder,
            prop: _prop,
            onLoaded: () => {

                this._createElements();
                this._onLoadedCallback();

                onPageShown(() => {
                    this._updateSizes();
                    if (renderSettings.autoShow) {
                        this._plane.show(500);
                    }
                });

            },
            onBeforeResizeCallback: () => {
                this._onBeforeResizeCallback();
            },
        });

    }

    /**
     * Create other elements
     */
    protected _createElements () {

        this._createLights();

    }

    /**
     * Create lights
     */
    protected _createLights () {

        const { lights } = this._prop.settings;

        lights.forEach((lightSettings, index) => {
            if (this._model) {

                if (lightSettings.type === 'spot') {
                    const light = new GlModelSceneSpotLight({
                        name: `${index}`,
                        prop: lightSettings,
                        scene: this._scene,
                        model: this._model,
                        guiParent: this._guiFolder,
                    });
                    this._lights.push(light);
                    this._lightsCount++;
                }
                else if (lightSettings.type === 'area') {
                    const light = new GlModelSceneAreaLight({
                        name: `${index}`,
                        prop: lightSettings,
                        scene: this._scene,
                        model: this._model,
                        guiParent: this._guiFolder,
                    });
                    this._lights.push(light);
                    this._lightsCount++;
                }
                else if (lightSettings.type === 'ambient') {
                    const light = new GlModelSceneAmbientLight({
                        name: `${index}`,
                        prop: lightSettings,
                        scene: this._scene,
                        model: this._model,
                        guiParent: this._guiFolder,
                    });
                    this._lights.push(light);
                    this._lightsCount++;
                }

                // else {

                // }

            }
        });

    }



    /**
     * Update scene sizes
     */
    protected _updateSizes () {

        this._onBeforeResizeCallback();

        if (this._model) {
            this._model.updateSizes();
        }

        for (let i = 0; i < this._lightsCount; i++) {
            const light = this._lights[i];
            light.update();
        }

    }



    /**
     * Render the scene
     */
    public render (
        force = false,
    ) {

        if (!this._renderTarget.prop.autoRender && !force) {
            return;
        }

        // render the model
        if (this._model) {
            this._model.targetMouseRotation = this._targetMouse;
            this._model.render();
        }

        // render lights
        for (let i = 0; i < this._lightsCount; i++) {
            const light = this._lights[i];
            light.render();
        }

        // render camera
        this._renderMouseCameraPosition();

        // process callbacks
        this._onRenderCallback();

    }

    /**
     * Calculate movement
     */
    protected _renderMouseCameraPosition () {

        // vars
        const { _targetMouse, _currentMouseCameraPosition } = this;
        const { mouseCameraPosition } = this._prop.settings.scene;
        const { camera } = this._renderTarget;
        const vWidth = viewport.size[0];
        const vHeight = viewport.size[1];

        // return if movement disabled
        if (!mouseCameraPosition.on) {
            return;
        }

        // interpolate movement
        _currentMouseCameraPosition.x = approximateLerp(
            _currentMouseCameraPosition.x, _targetMouse.x, mouseCameraPosition.ease,
        );
        const x = _currentMouseCameraPosition.x * mouseCameraPosition.x * vWidth;
        _currentMouseCameraPosition.y = approximateLerp(
            _currentMouseCameraPosition.y, _targetMouse.y, mouseCameraPosition.ease,
        );
        const y = _currentMouseCameraPosition.y * mouseCameraPosition.y * vHeight;

        // set lookAt
        if (mouseCameraPosition.staticLookAt) {
            camera.lookAt(new Vector3(0, 0, 0));
        }

        // and apply rotation
        camera.position.x = x;
        camera.position.y = y;

    }



    /**
     * Destroy the scene
     */
    public destroy () {

        this._destroyed = true;

        this._threeEvents.forEach((event) => {
            threeJS.remove(event);
        });

        if (this._inOutEvents) {
            this._inOutEvents.destroy();
        }

        this._listeners.forEach((listener) => {
            listener.remove();
        });

        this._plane.destroy();

        if (this._model) {
            this._model.destroy();
            this._model = false;
        }

        this._lights.forEach((light) => {
            light.destroy();
        });
        this._lights = [];

        this._renderTarget.destroy();

        if (!!siteGUI && this._guiFolder) {
            siteGUI.removeFolder(this._guiFolder);
        }

    }


}
