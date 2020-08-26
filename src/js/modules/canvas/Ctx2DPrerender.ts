import { get as getImageSize } from 'node-background-size';
import { Ctx2D } from './Ctx2D';



export class Ctx2DPrerender extends Ctx2D {

    constructor (
        public source: HTMLImageElement,
        parent: Element | false,
    ) {

        super(parent);
        this.updateSize();

    }

    public updateSize (
        width?: number,
        height?: number,
    ) {

        super.updateSize(width, height);

        const size = getImageSize({
            media: this.source,
            rule: 'cover',
            scale: 1,
            width: this.width,
            height: this.height,
        });

        this._ctx.clearRect(0, 0, this.width, this.height);

        // draw the image
        this._ctx.drawImage(
            this.source,
            0, 0,
            size.mediaWidth, size.mediaHeight,
            size.x, size.y, size.width, size.height,
        );

    }



}
