import app from '../../app/app';



export type ViewportType = 'desktop' | 'tablet' | 'mobile'

export function getViewportType (): ViewportType {
    if (app.viewport.desktop) {
        return 'desktop';
    }
    if (app.viewport.tablet) {
        return 'tablet';
    }
    return 'mobile';
}
