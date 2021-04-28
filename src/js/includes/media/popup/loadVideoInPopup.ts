import { generateId } from 'vevet';
import { setLoadingIndicator } from '../../../layout/loading/indicator';
import { createServerVideo } from '../video/createServerVideo';
import { createVideoPlayer } from '../video/createVideoPlayer';
import { mediaPopup } from './mediaPopup';



let isShown = false;

export enum VideoInPopupSourceEnum {
    YouTube = 'yt',
    Vimeo = 'vm',
    Server = 'srv',
}



export function loadVideoInPopup (
    source: VideoInPopupSourceEnum | false = false,
    src: string | false = false,
) {

    // check state
    if (isShown) {
        return;
    }
    isShown = true;

    // check data
    if (!source || !src) {
        return;
    }

    // the element
    let videoElement: HTMLVideoElement | HTMLIFrameElement | false = false;

    // get media source
    if (source === VideoInPopupSourceEnum.YouTube) {
        videoElement = createYoutubeVideo(src);
    }
    else if (source === VideoInPopupSourceEnum.Vimeo) {
        videoElement = createVimeoVideo(src);
    }
    else if (source === VideoInPopupSourceEnum.Server) {
        videoElement = createServerVideo(src);
    }

    // check if the video is created
    if (!videoElement) {
        return;
    }

    // create an outer for the video
    const outer = createOuter();
    outer.appendChild(videoElement);

    // show loading
    setLoadingIndicator(true);

    // create a player for server videos
    if (videoElement instanceof HTMLVideoElement) {
        createVideoPlayer(videoElement).then(() => {
            showInPopup(outer, () => {
                setLoadingIndicator(false);
            });
        });
    }
    // no player for other videos
    else {
        showInPopup(outer, () => {
            setLoadingIndicator(false);
        });
    }

}



/**
 * YouTube video
 */
function createYoutubeVideo (
    src: string,
) {

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${src}`);
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');

    iframe.addEventListener('load', () => {
        iframe.classList.add('loaded');
    });

    return iframe;

}

/**
 * Vimeo Video
 */
function createVimeoVideo (
    src: string,
) {

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://player.vimeo.com/video/${src}`);
    iframe.setAttribute('allow', 'autoplay; fullscreen');
    iframe.setAttribute('allowfullscreen', 'true');

    iframe.addEventListener('load', () => {
        iframe.classList.add('loaded');
    });

    return iframe;

}



/**
 * Create video outer
 */
function createOuter () {

    const outer = document.createElement('div');
    outer.style.display = 'none';
    outer.setAttribute('id', generateId('video-popup-source'));
    document.body.appendChild(outer);

    return outer;

}


/**
 * Show the videe in popup
 */
function showInPopup (
    outer: HTMLElement,
    callback = () => {},
) {

    mediaPopup.show({
        selector: `#${outer.id}`,
        append: true,
        types: ['media'],
    });
    mediaPopup.on('hidden', () => {
        outer.remove();
        isShown = false;
    }, {
        timeout: 50,
    });

    callback();

}
