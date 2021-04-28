vec4 verticalBlurShift(vec4 coord, float shift, float v) {
    coord.y = coord.y + shift * v;
    return coord;
}

vec4 verticalBlur(sampler2D tDiffuse, vec4 uv, vec4 sum) {

    float v = .1;

    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, -4.0, v) ) * 0.051;
    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, -3.0, v) ) * 0.0918;
    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, -2.0, v) ) * 0.12245;
    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, -1.0, v) ) * 0.1531;

    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, .0, v) ) * 0.1633;
    
    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, 1.0, v) ) * 0.1531;
    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, 2.0, v) ) * 0.12245;
    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, 3.0, v) ) * 0.0918;
    sum += texture2DProj( tDiffuse, verticalBlurShift(uv, 4.0, v) ) * 0.051;

    return sum;

}

#pragma glslify: export(verticalBlur)