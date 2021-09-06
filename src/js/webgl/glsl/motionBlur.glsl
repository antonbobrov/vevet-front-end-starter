const float MAX_KERNEL_SIZE = 6.0; // 7.0

// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float randK(vec2 co, float seed) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);
    return fract(sin(sn) * c + seed);
}

float motionBlur (
    float strength,
    float progress,
    vec2 uv,
    out vec4 color,
    sampler2D map
) {

    // blur setting
    vec2 center = vec2(1. / 2., 1. / 2.);
    vec2 filterArea = vec2(1., 1.);
    vec2 dir = vec2(center.xy / filterArea.xy - uv);
    dir *= strength * progress;
        
    // randomize the lookup values to hide the fixed number of samples
    float offset = randK(uv, 0.0);
    float total = 0.0;

    // blur
    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {

        float percent = (t + offset) / MAX_KERNEL_SIZE;
        float weight = 4.0 * (percent - percent * percent);
        vec2 p = uv + dir * percent;
        vec4 sampleColor = texture2D(map, p);

        color += sampleColor * weight;
        total += weight;

        if (t > MAX_KERNEL_SIZE){
            break;
        }

    }

    return total;
    
}
