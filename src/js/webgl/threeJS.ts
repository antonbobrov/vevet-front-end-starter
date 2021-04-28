import { preloader } from '../layout/loading/preloader';
import ThreeBase from './base/ThreeBase';

export const threeJS = new ThreeBase({
    outerSelector: '#three-js',
    cameras: '3d',
    cameraFar: 2000,
});

preloader.on('hide', () => {
    threeJS.play();
});


// window.addEventListener('scroll', () => {
//     threeJS.render();
// }, {
//     passive: false,
// });
