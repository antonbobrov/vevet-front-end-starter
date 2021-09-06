import {
    AmbientLight,
} from 'three';
import { GlAmbientLightSettings } from '../types';
import GlModelSceneLightBase from './GlModelSceneLightBase';



export default class GlModelSceneAmbientLight extends GlModelSceneLightBase<
    AmbientLight,
    GlAmbientLightSettings
> {
    /**
     * Create Light
     */
    protected _create () {
        super._create();

        const { _prop } = this;

        // create light
        this._light = new AmbientLight(_prop.color, 0);
        this._scene.add(this._light);
    }
}
