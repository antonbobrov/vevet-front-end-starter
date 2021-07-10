import { IDestroyable } from '../../commonTypes';
import app from '../../app/app';
import { getViewportType, ViewportType } from './getViewportType';



export function resizeOnViewportType (
    /**
     * Viewport types for which reload IS NOT required
     */
    excludeTypes: ViewportType[],
): IDestroyable {

    let prevViewportType = getViewportType();

    const event = app.viewport.on('', () => {

        const viewportType = getViewportType();
        if (viewportType === prevViewportType) {
            return;
        }

        if (!excludeTypes.includes(viewportType)) {
            location.reload();
        }
        else if (!excludeTypes.includes(prevViewportType)) {
            location.reload();
        }

        prevViewportType = getViewportType();

    });

    return {
        destroy: () => {
            app.viewport.remove(event);
        },
    };

}

