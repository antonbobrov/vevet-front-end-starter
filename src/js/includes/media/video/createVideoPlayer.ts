import '../../../../styles/includes/media/_video-js.scss';

/**
 * Create video player
 */
export default function createVideoPlayer (
    video: HTMLVideoElement,
) {
    return new Promise((
        resolve: (arg?: unknown) => void,
    ) => {
        import('video.js').then((module) => {
            video.classList.add('video-js');
            video.classList.add('vjs-adcd-theme');
            module.default(video, {});
            resolve();
        });
    });
}
