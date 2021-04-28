import {
    Mesh, MeshBasicMaterial, SphereGeometry, SpotLight, SpotLightHelper,
} from 'three';
import { minSiteGUIStep } from '../../../siteGUI';
import { GlSpotLightSettings } from '../types';
import { GlModelSceneLightBase } from './GlModelSceneLightBase';



export class GlModelSceneSpotLight extends GlModelSceneLightBase<
    SpotLight,
    GlSpotLightSettings
> {

    // vars
    protected _helper: SpotLightHelper;
    protected _helperTarget: Mesh;

    /**
     * Create Light
     */
    protected _create () {

        super._create();

        const { _prop } = this;
        const helperColor = 0xff0000;

        // create light
        this._light = new SpotLight(_prop.color, 0);
        this._scene.add(this._light);

        // target light
        this._scene.add(this._light.target);

        // create a light helper
        this._helper = new SpotLightHelper(this._light, helperColor);
        this._helper.visible = false;
        this._scene.add(this._helper);

        // create a target helper
        const helperTargetGeometry = new SphereGeometry(5, 5, 5);
        const helperTargetMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
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

        // light props
        settingsFolder.add(_prop, 'distance', 0, 2, minSiteGUIStep).onChange(this.update.bind(this));
        settingsFolder.add(_prop, 'penumbra', 0, 1, minSiteGUIStep).onChange(this.update.bind(this));
        settingsFolder.add(_prop, 'decay', 0, 0.25, minSiteGUIStep).onChange(this.update.bind(this));
        settingsFolder.add(_prop, 'angle', 0, 90, 1).onChange(this.update.bind(this));

        // target helper visibility
        targetFolder.add(this._helperTarget, 'visible').onChange(this.update.bind(this));

        // light target coords
        const { targetCoords } = _prop;
        targetFolder.add(targetCoords, 'x', -0.5, 0.5, minSiteGUIStep).onChange(this.update.bind(this));
        targetFolder.add(targetCoords, 'y', -0.5, 0.5, minSiteGUIStep).onChange(this.update.bind(this));
        targetFolder.add(targetCoords, 'z', -0.5, 0.5, minSiteGUIStep).onChange(this.update.bind(this));

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

        // change light props
        light.distance = _prop.distance * modelDiameter;
        light.decay = _prop.decay;
        light.angle = _prop.angle * Math.PI / 180;
        light.penumbra = _prop.penumbra;

        // positionate light target
        const { targetCoords } = _prop;
        const targetPos = light.target.position;
        targetPos.x = targetCoords.x * modelDiameter;
        targetPos.y = targetCoords.y * modelDiameter;
        targetPos.z = targetCoords.z * modelDiameter;

        // positionate target helper
        const targetHelperPos = this._helperTarget.position;
        targetHelperPos.x = targetPos.x;
        targetHelperPos.y = targetPos.y;
        targetHelperPos.z = targetPos.z;

        // update light matrix
        light.target.updateMatrixWorld();
        this._helper.update();

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

        if (this._light) {
            this._scene.remove(this._light.target);
        }
        this._scene.remove(this._helper);
        this._scene.remove(this._helperTarget);

    }


}
