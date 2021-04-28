vec4 horizontalBlurShift(vec4 coord, float shift, float v) {
    coord.x = coord.x + shift * v;
    return coord;
}

vec4 horizontalBlur(sampler2D tDiffuse, vec4 uv, vec4 sum) {

    float v = 1.;

    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, -4.0, v) ) * 0.051;
    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, -3.0, v) ) * 0.0918;
    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, -2.0, v) ) * 0.12245;
    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, -1.0, v) ) * 0.1531;

    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, .0, v) ) * 0.1633;
    
    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, 1.0, v) ) * 0.1531;
    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, 2.0, v) ) * 0.12245;
    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, 3.0, v) ) * 0.0918;
    sum += texture2DProj( tDiffuse, horizontalBlurShift(uv, 4.0, v) ) * 0.051;

    return sum;

}

#pragma glslify: export(horizontalBlur)