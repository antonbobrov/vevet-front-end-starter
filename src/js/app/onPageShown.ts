import app from './app';
import onPageCreated from './onPageCreated';

export default function onPageShown (
    callback: () => void,
) {
    let destroyed = false;

    const createdCallback = onPageCreated(() => {
        if (destroyed) {
            return;
        }
        const page = app.vevetPage;
        if (page) {
            page.onPageShown(() => {
                callback();
            });
        }
    });

    return {
        destroy: () => {
            createdCallback.destroy();
            destroyed = true;
        },
    };
}
