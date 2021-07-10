export const OpenServerDomain = 'vevet-front-end-starter';

export const isTesting = process.env.NODE_ENV === 'development';

export const lang = document.documentElement.getAttribute('lang');
export const langDir = document.documentElement.getAttribute('dir') as 'ltr' | 'rtl';

export function isRtl () {
    return langDir === 'rtl';
}

export const resizeTimeout = 100;
export const useAdaptiveFontSize = true;

export const pageSettings = {
    default: 'default-page',
    load: !isTesting ? 250 : 10,
    update: 10,
    done: !isTesting ? 250 : 10,
};
