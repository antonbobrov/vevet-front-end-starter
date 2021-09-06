import { Plugin, ScrollModule, DraggerModule } from 'vevet';



export default class ScrollLinePlugin extends Plugin {
    protected _m: ScrollModule;
    protected _outer: HTMLElement;
    protected _line: HTMLElement;


    _extra () {
        super._extra();

        this._create();
    }

    protected _create () {
        this._outer = document.createElement('div');
        this._outer.classList.add('v-scroll-line');
        this._m.outer.appendChild(this._outer);

        this._line = document.createElement('div');
        this._line.classList.add('v-scroll-line__progress');
        this._outer.appendChild(this._line);
    }



    _setEvents () {
        super._setEvents();

        // render the line
        this._m.on('update', this._render.bind(this));

        // set dragging
        this._setDrag();
    }

    protected _setDrag () {
        const dragger = new DraggerModule({
            outer: this._outer,
        });

        dragger.on('move', (data) => {
            this._move(data);
        });

        dragger.on('start', (data) => {
            this._move(data);
        });
    }

    protected _move (data: DraggerModule.Callback) {
        const bounding = this._outer.getBoundingClientRect();

        const progress = data.inner.y / bounding.height;
        const maxScroll = this._m.scrollHeight - this._m.height;

        this._m.targetTop = progress * maxScroll;
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        this._m._boundaries(true);
    }



    protected _render () {
        const progress = this._m.scrollTop / (this._m.scrollHeight - this._m.height);
        this._line.style.transform = `scale(1, ${progress})`;
    }
}
