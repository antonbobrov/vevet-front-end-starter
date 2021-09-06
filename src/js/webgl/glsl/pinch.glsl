#pragma glslify: easing = require('./easing')

vec2 pinch(vec2 coord, vec2 center, float strength, float radius) {

    float scale = strength;
    coord -= vec2(0.5);
    coord *= 1. + scale / 2.;
    coord += vec2(0.5);

    coord -= center;
    float distanceBulge = length(coord);
    float power = strength; // * pow(easing(distanceBulge), .5);

    if (distanceBulge < radius) {
        float percent = distanceBulge / radius;
        if (power > 0.0) {
            coord *= mix(1.0, smoothstep(0.0, radius / distanceBulge, percent), power * 0.75);
        } else {
            coord *= mix(1.0, pow(percent, 1.0 + power * 0.75) * radius / distanceBulge, 1.0 - percent);
        }
    }
    coord += center;

    return coord;

}

#pragma glslify: export(pinch)
