import {
    Box3,
    Color,
    Group, Mesh, MeshBasicMaterial,
    MeshPhysicalMaterial, MeshStandardMaterial, Object3D, Scene, Vector3,
} from 'three';
import app from '../../app/app';
import { Coords2D } from '../../commonTypes';
import { approximateLerp } from '../../helpers/math/approximateLerp';
import { GUIType, minSiteGUIStep } from '../../siteGUI';
import { getModelSphereRadius } from '../helpers/getModelSphereRadius';
import { loadOBJ } from '../helpers/loadOBJ';
import {
    resetObject3DCoords, setObject3DScale,
} from '../helpers/object3DPos';
import { threeJS } from '../threeJS';
import { GlModelSceneProp } from './types';



const { viewport } = app;

interface Data<T> {
    parent: HTMLElement;
    scene: Scene | Group;
    guiParent: false | GUIType;
    prop: T;
    onLoaded: false | (() => void);
    onBeforeResizeCallback: () => void;
}



export class GlModelSceneObj<
    Prop extends GlModelSceneProp = GlModelSceneProp
> {

    // states
    protected _loaded = false;
    protected _destroyed = false;
    protected _allowRender = true;
    protected _skipRendering = {
        count: 0,
        done: 0,
    };

    // vars
    protected _guiFolder: GUIType | false = false;
    protected _loadedObject: false | Object3D = false;
    get loadedObject () {
        return this._loadedObject;
    }

    /**
     * Group for all
     */
    protected _group: false | Group = false;

    protected _material: MeshStandardMaterial | MeshPhysicalMaterial;

    // movement
    protected _position = {
        x: 0,
        y: 0,
        z: 0,
    };
    protected _currentMouseRotation: Coords2D = {
        x: 0,
        y: 0,
    };
    protected _targetMouseRotation: Coords2D = {
        x: 0,
        y: 0,
    };
    set targetMouseRotation (
        val: Coords2D,
    ) {
        this._targetMouseRotation = val;
    }

    // sizes
    protected _initialRadius = 0;
    protected _diameter = 1;
    get diameter () {
        return this._diameter;
    }



    // prop vars
    protected _parent: Data<Prop>['parent'];
    protected _guiParent: Data<Prop>['guiParent'];
    protected _scene: Data<Prop>['scene'];
    protected _prop: Data<Prop>['prop'];
    protected _settings: Data<Prop>['prop']['settings']['obj'];
    protected _onLoaded: Data<Prop>['onLoaded'];
    protected _onBeforeResizeCallback: Data<Prop>['onBeforeResizeCallback'];

    constructor ({
        parent,
        scene,
        guiParent,
        prop,
        onLoaded,
        onBeforeResizeCallback,
    }: Data<Prop>) {

        this._parent = parent;
        this._prop = prop;
        this._settings = prop.settings.obj;
        this._scene = scene;
        this._onLoaded = onLoaded;
        this._guiParent = guiParent;
        this._onBeforeResizeCallback = onBeforeResizeCallback;

        this._create();

    }



    /**
     * Create the object
     */
    protected _create () {

        const { _prop } = this;
        const { paths } = _prop;

        // create gui
        this._createGUI();

        // load the model
        loadOBJ({
            path: paths.objPath,
            src: paths.objSrc,
        }).then((obj) => {
            if (!this._destroyed) {
                this._loaded = true;
                this._createModel(obj);
            }
        });

    }



    /**
     * Create GUI
     */
    protected _createGUI () {

        if (!this._guiParent) {
            return;
        }

        const folder = this._guiParent.addFolder('model settings');
        this._guiFolder = folder;

        const { _settings } = this;

        // default scale
        const defaultScaleFolder = folder.addFolder('default scale');
        defaultScaleFolder.add(_settings.defaultScale, 'desktop', 0, 1.5, minSiteGUIStep).onChange(() => {
            this.updateSizes();
        });
        defaultScaleFolder.add(_settings.defaultScale, 'tablet', 0, 1.5, minSiteGUIStep).onChange(() => {
            this.updateSizes();
        });
        defaultScaleFolder.add(_settings.defaultScale, 'mobile', 0, 1.5, minSiteGUIStep).onChange(() => {
            this.updateSizes();
        });

        // default rotation
        const defaultRotationFolder = folder.addFolder('default rotation');
        defaultRotationFolder.add(_settings.defaultRotation, 'x', -180, 180, 1).onChange(() => {
            this.updateSizes();
        });
        defaultRotationFolder.add(_settings.defaultRotation, 'y', -180, 180, 1).onChange(() => {
            this.updateSizes();
        });
        defaultRotationFolder.add(_settings.defaultRotation, 'z', -180, 180, 1).onChange(() => {
            this.updateSizes();
        });

        // default position
        const defaultPositionFolder = folder.addFolder('default position');
        defaultPositionFolder.add(_settings.defaultPosition, 'x', -0.25, 0.25, minSiteGUIStep);
        defaultPositionFolder.add(_settings.defaultPosition, 'y', -0.25, 0.25, minSiteGUIStep);
        defaultPositionFolder.add(_settings.defaultPosition, 'z', -0.25, 0.25, minSiteGUIStep);

        // mouse rotation
        const mouseRotationFolder = folder.addFolder('mouse rotation');
        mouseRotationFolder.add(_settings.mouseRotation, 'on');
        mouseRotationFolder.add(_settings.mouseRotation, 'ease', 0.001, 0.3, minSiteGUIStep);
        mouseRotationFolder.add(_settings.mouseRotation, 'x', 0, Math.PI / 2, minSiteGUIStep);
        mouseRotationFolder.add(_settings.mouseRotation, 'y', 0, Math.PI / 2, minSiteGUIStep);

    }


    /**
     * Create the model
     */
    protected _createModel (
        object: Group,
    ) {

        this._loadedObject = object;

        // create groups
        this._createObject(this._loadedObject);

        // create a new material
        this._createMaterial();

        // update the object sizes
        this.updateSizes();

        // apply the new material to the object
        object.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = this._material;
            }
        });

        // set event listeners
        this._setEvents();

        // onloded-event
        if (this._onLoaded) {
            this._onLoaded();
        }

    }



    /**
     * Create model groups
     */
    protected _createObject (
        child: Object3D,
    ) {

        // create a group for the object
        this._group = new Group();
        this._group.add(child);
        this._scene.add(this._group);

        // reset group coordinates
        this._resetObjects();

    }

    /**
     * Reset group coordinates
     */
    protected _resetObjects () {

        if (!this._group || !this._loadedObject) {
            return;
        }

        resetObject3DCoords(this._group);
        resetObject3DCoords(this._loadedObject);

    }



    /**
     * Create the model material
     */
    protected _createMaterial () {

        // get material properties
        const { _settings } = this;
        const { materialProp, materialType } = _settings;

        // create the material
        if (materialType === 'physical') {
            this._material = new MeshPhysicalMaterial({
                ...materialProp,
            });
        }
        else {
            this._material = new MeshStandardMaterial({
                ...materialProp,
            });
        }
        const material = this._material;

        // create GUI
        if (this._guiFolder) {

            const folder = this._guiFolder.addFolder('material prop');

            folder.addColor(materialProp, 'color').onChange((val) => {
                material.color = new Color(val);
            });
            folder.addColor(materialProp, 'emissive').onChange((val) => {
                material.emissive = new Color(val);
            });

            if (!(material instanceof MeshBasicMaterial)) {
                folder.add(material, 'roughness', 0, 1, minSiteGUIStep).onChange((val) => {
                    materialProp.roughness = val;
                });
                folder.add(material, 'metalness', 0, 1, minSiteGUIStep).onChange((val) => {
                    materialProp.metalness = val;
                });
                folder.add(material, 'envMapIntensity', 0, 5, minSiteGUIStep).onChange((val) => {
                    materialProp.envMapIntensity = val;
                });
                if (material instanceof MeshPhysicalMaterial) {
                    folder.add(material, 'reflectivity', 0, 1, minSiteGUIStep).onChange((val) => {
                        // @ts-ignore
                        materialProp.reflectivity = val;
                    });
                }
            }

        }

    }



    /**
     * Set event listeners
     */
    protected _setEvents () {

    }



    /**
     * Update object sizes
     */
    public updateSizes () {

        if (!this._loaded) {
            return;
        }
        if (!this._group || !this._loadedObject) {
            return;
        }

        // process callbacks
        this._onBeforeResizeCallback();

        // skip rendering
        this._allowRender = false;
        this._skipRendering.count = 2;
        this._skipRendering.done = 0;

        // reset coordinates
        this._resetObjects();

        // get the object
        const object = this._loadedObject;
        const { _settings } = this;
        const { useParentSize } = this._prop.renderSettings;

        // get target scaling
        const parent = this._parent;
        const parentWidth = useParentSize ? parent.clientWidth : threeJS.width;
        const parentHeight = useParentSize ? parent.clientHeight : threeJS.height;

        // calculate screen dimensions
        const minSide = Math.min(parentWidth, parentHeight);
        const screenRadius = minSide / 2;
        const viewScale = this._getViewScale();
        const objectTargetRadius = screenRadius * viewScale;

        // rotate the object
        const { defaultRotation } = _settings;
        if (object) {
            object.rotation.x = (defaultRotation.x * Math.PI / 180);
            object.rotation.y = (defaultRotation.y * Math.PI / 180);
            object.rotation.z = (defaultRotation.z * Math.PI / 180);
            // and update initial radius
            this._initialRadius = getModelSphereRadius(object);
        }

        // set object scaling
        const scaleVal = objectTargetRadius / this._initialRadius;
        setObject3DScale(object, scaleVal);

        // get new boundings
        const boxScaled = new Box3().setFromObject(object);
        const center = boxScaled.getCenter(new Vector3());
        // center align
        object.position.x -= center.x;
        object.position.y -= center.y;
        object.position.z -= center.z;

        // update position var
        this._position.x = object.position.x;
        this._position.y = object.position.y;
        this._position.z = object.position.z;

        // update dimensions vars
        const newRadius = getModelSphereRadius(object);
        this._diameter = newRadius * 2;

        // update position
        this._processPosition();
        this._processDefaultRotation();

        // states
        this._allowRender = true;

    }

    protected _getViewScale () {
        const { defaultScale } = this._settings;
        if (viewport.desktop) {
            return defaultScale.desktop;
        }
        if (viewport.tablet) {
            return defaultScale.tablet;
        }
        return defaultScale.mobile;
    }



    /**
     * Render the object
     */
    public render () {

        if (!this._allowRender) {
            return;
        }
        const { _skipRendering } = this;
        if (_skipRendering.count !== _skipRendering.done) {
            _skipRendering.done++;
            return;
        }

        this._processPosition();
        this._processMouseRotation();

    }



    /**
     * Positionate the model
     */
    protected _processPosition () {

        const object = this._loadedObject;
        if (!object) {
            return;
        }
        const { defaultPosition } = this._settings;

        object.position.x = this._position.x + (defaultPosition.x * this._diameter);
        object.position.y = this._position.y + (defaultPosition.y * this._diameter);
        object.position.z = this._position.z + (defaultPosition.z * this._diameter);

    }

    /**
     * Set default rotation the model
     */
    protected _processDefaultRotation () {

        const object = this._group;
        if (!object) {
            return;
        }
        const { defaultRotation } = this._settings;
        const defaultRotationX = (defaultRotation.x * Math.PI / 180);
        const defaultRotationY = (defaultRotation.y * Math.PI / 180);

        object.rotation.x = defaultRotationX;
        object.rotation.y = defaultRotationY;

    }

    /**
     * Rotate the model
     */
    protected _processMouseRotation () {

        if (!this._loadedObject) {
            return;
        }

        // vars
        const group = this._loadedObject;
        const currentMouseRotation = this._currentMouseRotation;
        const targetMouseRotation = this._targetMouseRotation;
        const { mouseRotation } = this._settings;

        // interpolate movement
        currentMouseRotation.x = mouseRotation.on ? approximateLerp(
            currentMouseRotation.x, targetMouseRotation.x, mouseRotation.ease,
        ) : 0;
        currentMouseRotation.y = mouseRotation.on ? approximateLerp(
            currentMouseRotation.y, targetMouseRotation.y, mouseRotation.ease,
        ) : 0;

        // and apply rotation
        group.rotation.x = currentMouseRotation.y * mouseRotation.y;
        group.rotation.y = currentMouseRotation.x * mouseRotation.x;

    }



    /**
     * Destroy the object
     */
    public destroy () {

        this._destroyed = true;

        if (this._group) {
            this._scene.remove(this._group);
        }

        if (!!this._guiParent && this._guiFolder) {
            this._guiParent.removeFolder(this._guiFolder);
        }

    }


}
