import app from '../../app/app';

export function getRenderTargetDPR () {

    if (app.viewport.mobiledevice) {
        return app.viewport.dprMobile;
    }

    return 2; // app.viewport.dpr;

}
