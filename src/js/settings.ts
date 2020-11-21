export const OpenServerDomain = 'template';

export const isTesting = process.env.NODE_ENV === 'development';

export const resizeTimeout = 100;

export const afterloadDuration = 1000;

export const adaptiveFont = true;

export const showHidePageDuration = !isTesting ? 250 : 10;
export const pageSettings = {
    default: 'default-page',
    load: showHidePageDuration,
    update: 10,
    done: showHidePageDuration,
};

export const useCustomScroll = true;
