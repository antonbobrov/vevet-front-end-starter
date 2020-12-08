export const OpenServerDomain = 'vevet-front-end-starter';

export const isTesting = process.env.NODE_ENV === 'development';

export const resizeTimeout = 100;
export const useAdaptiveFontSize = true;

export const showHidePageDuration = !isTesting ? 250 : 10;
export const pageSettings = {
    default: 'default-page',
    load: showHidePageDuration,
    update: 10,
    done: showHidePageDuration,
};
