import { merge } from 'vevet';
import { Color } from 'three';
import { ThreePlane, IThreePlane } from './ThreePlane';



export namespace IThreePlaneBg {

    export interface Properties extends IThreePlane.Properties {

        /**
         * @description Background Color. F.e., 0xffffff.
         */
        bg: number | Color;

    }

}



export class ThreePlaneBg extends ThreePlane {

    protected _prop: IThreePlaneBg.Properties;

    // @ts-ignore
    get defaultProp (): IThreePlaneBg.Properties {
        return merge(super.defaultProp, {
            bg: 0xffffff,
        });
    }

    // @ts-ignore
    get prop (): IThreePlaneBg.Properties {
        return this._prop;
    }



    constructor (data: IThreePlaneBg.Properties) {
        super(data);
    }

    // Extra Constructor
    protected _extra () {

        super._extra();

        // set color
        this.on('material', this._setColor.bind(this));

    }



    /**
     * @description Set plane color.
     */
    protected _setColor () {

        if (this.prop.bg instanceof Color) {
            this._material.color = this.prop.bg;
        }
        else {
            this._material.color.setHex(this.prop.bg);
        }

    }



}
