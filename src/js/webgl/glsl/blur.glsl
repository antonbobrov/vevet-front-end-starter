// https://www.shadertoy.com/view/Xltfzj

vec4 blurShift(vec4 coord, float shiftX, float shiftY) {
    coord.x = coord.x + shiftX;
    coord.y = coord.y + shiftY;
    return coord;
}

vec4 blur_texture2DProj(sampler2D tDiffuse, vec4 uv) {

    const float Pi = 6.28318530718;
    const float Directions = 16.0;
    const float DirStep = Pi / Directions;
    const float Quality = 2.0;
    const float QualityStep = 1. / Quality;
    const float Size = 15.0;
    
    // Pixel colour
    vec4 Color = texture2DProj(tDiffuse, uv);
    
    // Blur calculations
    for (float d = 0.0; d < Pi; d += DirStep) {
		for (float i = QualityStep; i <= 1.0; i += QualityStep) {
            Color += texture2DProj( tDiffuse, blurShift(uv, cos(d)*Size*i, sin(d)*Size*i) );
        }
    }
    
    // Output to screen
    Color /= Quality * Directions - 15.0;

    return Color;

}

#pragma glslify: export(blur_texture2DProj)