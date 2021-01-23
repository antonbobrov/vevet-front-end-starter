import app from '../../app/app';

export const useCustomScroll = customScrollAvailable();
export const useWindowScroll = !useCustomScroll;

if (!useCustomScroll && useWindowScroll) {
    document.documentElement.classList.add('use-native-scroll');
}



function customScrollAvailable () {
    if (app.viewport.mobiledevice) {
        return false;
    }
    if (['firefox', 'edge'].includes(app.browser)) {
        return false;
    }
    return true;
}



// scroll to top on resize (mobile bug)
app.viewport.on('', () => {
    if (!useWindowScroll) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
}, {
    timeout: 650,
});

// disable scroll restoration
if (useWindowScroll) {
    window.history.scrollRestoration = 'manual';
}
