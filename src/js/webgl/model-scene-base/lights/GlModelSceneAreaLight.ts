import {
    Mesh, MeshBasicMaterial, RectAreaLight, SphereGeometry,
} from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { minSiteGUIStep } from '../../../siteGUI';
import { GlAreaLightSettings } from '../types';
import GlModelSceneLightBase from './GlModelSceneLightBase';

RectAreaLightUniformsLib.init();


export default class GlModelSceneAreaLight extends GlModelSceneLightBase<
    RectAreaLight,
    GlAreaLightSettings
> {
    // vars
    protected _helper: RectAreaLightHelper;
    protected _helperTarget: Mesh;

    /**
     * Create Light
     */
    protected _create () {
        super._create();

        const { _prop } = this;
        const helperColor = 0xffffff;

        // create light
        this._light = new RectAreaLight(_prop.color, 0, 1, 1);
        this._scene.add(this._light);

        // create a light helper
        this._helper = new RectAreaLightHelper(this._light, helperColor);
        this._helper.visible = false;

        // create a target helper
        const helperTargetGeometry = new SphereGeometry(5, 5, 5);
        const helperTargetMaterial = new MeshBasicMaterial({ color: 0x66ff33 });
        this._helperTarget = new Mesh(helperTargetGeometry, helperTargetMaterial);
        this._helperTarget.visible = false;
        this._scene.add(this._helperTarget);
    }



    /**
     * Create GUI
     */
    protected _createGUI () {
        const gui = super._createGUI();
        if (!gui) {
            return false;
        }

        // vars
        const { _prop } = this;
        const { folder, settingsFolder } = gui;
        const targetFolder = folder.addFolder('light target');

        // helper visibility
        settingsFolder.add(this._helper, 'visible').onChange(this.update.bind(this));

        // target helper visibility
        targetFolder.add(this._helperTarget, 'visible').onChange(this.update.bind(this));

        // light target coords
        const { targetCoords } = _prop;
        targetFolder.add(targetCoords, 'x', -0.5, 0.5, minSiteGUIStep).onChange(this.update.bind(this));
        targetFolder.add(targetCoords, 'y', -0.5, 0.5, minSiteGUIStep).onChange(this.update.bind(this));
        targetFolder.add(targetCoords, 'z', -0.5, 0.5, minSiteGUIStep).onChange(this.update.bind(this));

        // light props
        settingsFolder.add(_prop, 'width', 0, 2, minSiteGUIStep).onChange(this.update.bind(this));
        settingsFolder.add(_prop, 'height', 0, 2, minSiteGUIStep).onChange(this.update.bind(this));

        return {
            folder,
            settingsFolder,
            targetFolder,
        };
    }



    /**
     * Update the object
     */
    public update () {
        super.update();

        const light = this._light;
        if (!light) {
            return;
        }

        // vars
        const { _prop } = this;
        const modelDiameter = this._model.diameter;

        // positionate target helper
        const { targetCoords } = _prop;
        const targetHelperPos = this._helperTarget.position;
        targetHelperPos.x = targetCoords.x * modelDiameter;
        targetHelperPos.y = targetCoords.y * modelDiameter;
        targetHelperPos.z = targetCoords.z * modelDiameter;

        // update light sizes
        light.width = _prop.width * modelDiameter;
        light.height = _prop.height * modelDiameter;

        // set lookAt
        light.lookAt(targetHelperPos);

        // show helper
        if (this._helper.visible) {
            this._scene.add(this._helper);
        } else {
            this._scene.remove(this._helper);
        }
    }



    /**
     * Render the object
     */
    public render () {
        super.render();
    }



    /**
     * Destroy the object
     */
    public destroy () {
        super.destroy();

        this._scene.remove(this._helper);
        this._scene.remove(this._helperTarget);
    }
}
