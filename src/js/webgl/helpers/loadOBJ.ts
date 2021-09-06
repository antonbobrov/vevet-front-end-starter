import { Group, LoadingManager } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { resetObject3DCoords } from './object3DPos';

interface Data {
    path: string;
    src: string;
}

interface StorageData extends Data {
    obj: Group;
}

const loadedItems: StorageData[] = [];



export default function loadOBJ ({
    path,
    src,
}: Data) {
    return new Promise((resolve: (
        item: Group,
    ) => void) => {
        // check if the object exists
        let loadedItem: StorageData | false = false;
        for (let index = 0; index < loadedItems.length; index++) {
            const item = loadedItems[index];
            if (
                item.path === path
                && item.src === src
            ) {
                loadedItem = item;
            }
        }

        // resolve if it is loaded
        if (loadedItem) {
            resetObject3DCoords(loadedItem.obj, true);
            resolve(loadedItem.obj);
        } else {
            // otherwise load the object
            const manager = new LoadingManager();
            const objLoader = new OBJLoader(manager);
            objLoader
                .setPath(path)
                .load(src, (obj) => {
                    const item: StorageData = {
                        path,
                        src,
                        obj,
                    };
                    loadedItems.push(item);
                    resetObject3DCoords(obj, true);
                    resolve(obj);
                });
        }
    });
}
