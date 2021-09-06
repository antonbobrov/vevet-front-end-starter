import { Object3D } from 'three';
import { Coords3D } from '../../commonTypes';



export function resetObject3DCoords (
    obj: Object3D,
    recursive = false,
) {
    resetObject3DRotation(obj);
    resetObject3DPosition(obj);
    resetObject3DScale(obj);

    if (recursive) {
        obj.children.forEach((child) => {
            resetObject3DCoords(child);
        });
    }
}



export function resetObject3DRotation (
    obj: Object3D,
) {
    obj.rotation.set(0, 0, 0);
}

export function setObject3DRotation (
    obj: Object3D,
    val: Coords3D,
) {
    obj.rotation.set(val.x, val.y, val.z);
}



export function resetObject3DPosition (
    obj: Object3D,
) {
    obj.position.set(0, 0, 0);
}

export function setObject3DPosition (
    obj: Object3D,
    val: Coords3D,
) {
    obj.position.set(val.x, val.y, val.z);
}



export function resetObject3DScale (
    obj: Object3D,
) {
    setObject3DScale(obj, 1);
}

export function setObject3DScale (
    obj: Object3D,
    val: number,
) {
    obj.scale.set(val, val, val);
}
