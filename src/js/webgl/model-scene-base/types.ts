import { MeshPhysicalMaterialParameters, MeshStandardMaterialParameters } from 'three';
import { Coords3D } from '../../commonTypes';



export interface GlLightBaseSettings {
    type: string;
    color: number;
    intensity: number;
    coords: Coords3D;
}

export interface GlSpotLightSettings extends GlLightBaseSettings {
    type: 'spot';
    targetCoords: Coords3D;
    distance: number;
    penumbra: number;
    decay: number;
    angle: number;
}

export interface GlAreaLightSettings extends GlLightBaseSettings {
    type: 'area';
    targetCoords: Coords3D;
    width: number;
    height: number;
}

export interface GlAmbientLightSettings extends GlLightBaseSettings {
    type: 'ambient';
}



export interface GlModelScenePathsSettings {
    objPath: string;
    objSrc: string;
    envMapSrc: string;
}

export interface GlModelSceneObjSettings {
    defaultScale?: {
        desktop?: number;
        tablet?: number;
        mobile?: number;
    };
    defaultPosition: Partial<Coords3D>;
    defaultRotation?: Partial<Coords3D>;
    mouseRotation?: {
        on?: boolean;
        ease?: number;
        x?: number;
        y?: number;
    };
    materialType?: 'standard' | 'physical';
    materialProp?: MeshStandardMaterialParameters | MeshPhysicalMaterialParameters;
}



export interface GlModelSceneSceneSettings {
    mouseCameraPosition: {
        on: boolean;
        staticLookAt: boolean;
        ease: number;
        x: number;
        y: number;
    }
}



export interface GlModelSceneSettings {
    obj?: GlModelSceneObjSettings;
    lights?: (GlSpotLightSettings | GlAreaLightSettings | GlAmbientLightSettings)[];
    scene?: GlModelSceneSceneSettings;
}



export interface GlModelSceneProp {
    parent: HTMLElement;
    renderSettings: GlModelScenePropRenderSettings,
    name: string;
    paths: GlModelScenePathsSettings;
    settings: GlModelSceneSettings;
}

export interface GlModelScenePropRenderSettings {
    useParentSize?: boolean;
    renderPosition?: boolean;
    useRenderIntersection?: boolean;
    autorender?: boolean;
    cameraFar?: number;
    autoShow?: boolean;
    useOrbitControls?: boolean;
}
