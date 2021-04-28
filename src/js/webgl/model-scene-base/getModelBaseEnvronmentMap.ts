import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { UnsignedByteType, PMREMGenerator, Texture } from 'three';
import { threeJS } from '../threeJS';



const pmremGenerator = new PMREMGenerator(threeJS.renderer);
pmremGenerator.compileEquirectangularShader();

const textures: Record<string, Texture> = {};



export function getModelBaseEnvronmentMap (
    src: string,
) {

    // has envmap
    return new Promise((
        resolve: (texture: Texture) => void,
        reject,
    ) => {

        if (textures[src]) {
            resolve(textures[src]);
        }
        else {

            new RGBELoader()
                .setDataType(UnsignedByteType)
                .load(
                    src,
                    (texture) => {
                        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
                        pmremGenerator.dispose();
                        textures[src] = envMap;
                        resolve(envMap);
                    },
                    undefined,
                    reject,
                );

        }

    });

}
