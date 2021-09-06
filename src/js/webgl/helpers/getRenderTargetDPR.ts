import app from '../../app/app';

export default function getRenderTargetDPR () {
    if (app.viewport.mobiledevice) {
        return app.viewport.dprMobile;
    }

    return 2; // app.viewport.dpr;
}
