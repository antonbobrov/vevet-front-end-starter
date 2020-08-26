export const OpenServerDomain = 'template';

export const isTesting = process.env.NODE_ENV === 'development';

export const resizeTimeout = 100;

export const afterloadDuration = 1000;

export const adaptiveFont = true;

export const pageSettings = {
    default: 'default-page',
    load: !isTesting ? 250 : 10,
    update: 10,
    done: !isTesting ? 250 : 10,
};

export const useCustomScroll = true;
