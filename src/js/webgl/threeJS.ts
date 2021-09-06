import preloader from '../layout/loading/preloader';
import ThreeBase from './base/ThreeBase';

const threeJS = new ThreeBase({
    outerSelector: '#three-js',
    cameras: '3d',
    cameraFar: 2000,
});
export default threeJS;

preloader.on('hide', () => {
    threeJS.play();
});
