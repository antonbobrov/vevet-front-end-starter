import { Object3D, Box3, Sphere } from 'three';

export function getModelSphereRadius (obj: Object3D) {

    const box = new Box3().setFromObject(obj);
    const sphere = new Sphere();
    const { radius } = box.getBoundingSphere(sphere);

    return radius;

}
