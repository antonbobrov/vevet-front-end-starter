vec2 scale (
    vec2 coord, 
    float strength
) {

    coord -= vec2(0.5);
    coord *= 1. - strength;
    coord += vec2(0.5);

    return coord;

}

#pragma glslify: export(scale)
