import { getPos } from 'get-image-pos';
import Ctx2D from './Ctx2D';



export default class Ctx2DPrerender extends Ctx2D {
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

        const size = getPos({
            source: this.source,
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
            size.sourceWidth, size.sourceHeight,
            size.x, size.y, size.width, size.height,
        );
    }
}
