import { ScrollModule } from 'vevet';

export class CustomScrollOptimizedOnResize extends ScrollModule {

    protected _autoResizeFrames = 0;

    _autoResize () {

        this._autoResizeFrames++;
        if (this._autoResizeFrames > 60) {
            this._autoResizeFrames = 0;
            super._autoResize();
        }

    }

}
