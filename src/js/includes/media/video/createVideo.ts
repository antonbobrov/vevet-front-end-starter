/**
 * Create an HTML Video
 */
export default function createVideo (
    src: string,
) {
    interface VideoElement extends HTMLVideoElement {
        disablePictureInPicture: boolean;
    }

    const video = document.createElement('video') as VideoElement;
    video.disablePictureInPicture = true;
    video.setAttribute('preload', 'auto');
    video.crossOrigin = 'anonymous';
    video.autoplay = false;
    video.controls = true;
    video.playsInline = true;

    const source = document.createElement('source');
    source.setAttribute('src', `${src}#t=0.1`);
    source.setAttribute('type', 'video/mp4');
    video.appendChild(source);

    return video;
}
