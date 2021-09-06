import {
    Color, Group, Scene, Light,
} from 'three';
import { GUIType, minSiteGUIStep } from '../../../siteGUI';
import GlModelSceneObj from '../GlModelSceneObj';
import { GlLightBaseSettings } from '../types';



interface Data <
    LightProp
> {
    name: string;
    prop: LightProp;
    scene: Scene | Group;
    model: GlModelSceneObj;
    guiParent: false | GUIType;
}



export default abstract class GlModelSceneLightBase<
    LightType extends Light,
    LightProp extends GlLightBaseSettings,
> {
    // vars
    protected _guiFolder: GUIType | false = false;
    protected _light: LightType | false = false;


    protected _name: string;
    protected _prop: LightProp;
    protected _scene: Scene | Group;
    protected _model: GlModelSceneObj;
    protected _guiParent: false | GUIType;

    constructor ({
        name,
        prop,
        scene,
        model,
        guiParent,
    }: Data<LightProp>) {
        // set vars
        this._name = name;
        this._prop = prop;
        this._scene = scene;
        this._model = model;
        this._guiParent = guiParent;

        // create light
        this._create();
        this.update();

        // create gui
        this._createGUI();
    }



    /**
     * Create Light
     */
    protected _create () {

    }



    /**
     * Create GUI
     */
    protected _createGUI () {
        if (!this._guiParent) {
            return false;
        }

        // vars
        const { _prop } = this;
        const folder = this._guiParent.addFolder(`${_prop.type} light settings ${this._name}`);
        this._guiFolder = folder;
        const settingsFolder = folder.addFolder('light settings');

        // light color
        settingsFolder.addColor(_prop, 'color').onChange(this.update.bind(this));
        settingsFolder.add(_prop, 'intensity', 0, 5, minSiteGUIStep).onChange(this.update.bind(this));

        // light coords
        if (_prop.type !== 'ambient') {
            const lightCoords = _prop.coords;
            settingsFolder.add(lightCoords, 'x', -2, 2, minSiteGUIStep).onChange(this.update.bind(this));
            settingsFolder.add(lightCoords, 'y', -2, 2, minSiteGUIStep).onChange(this.update.bind(this));
            settingsFolder.add(lightCoords, 'z', -2, 2, minSiteGUIStep).onChange(this.update.bind(this));
        }

        return {
            folder,
            settingsFolder,
        };
    }



    /**
     * Update the object
     */
    public update () {
        const light = this._light;
        if (!light) {
            return;
        }

        // vars
        const { _prop } = this;
        const modelDiameter = this._model.diameter;

        // positionate light
        if (_prop.type !== 'ambient') {
            const lightPos = light.position;
            const lightCoords = _prop.coords;
            lightPos.x = lightCoords.x * modelDiameter;
            lightPos.y = lightCoords.y * modelDiameter;
            lightPos.z = lightCoords.z * modelDiameter;
        }

        // change light props
        light.color = new Color(_prop.color);
        light.intensity = _prop.intensity;
    }



    /**
     * Render the object
     */
    public render () {

    }



    /**
     * Destroy the object
     */
    public destroy () {
        if (!!this._guiParent && this._guiFolder) {
            this._guiParent.removeFolder(this._guiFolder);
        }

        if (this._light) {
            this._scene.remove(this._light);
        }
    }
}
