vec4 blend(vec4 bg,vec4 fg){
    vec3 bgm=bg.rgb*bg.a;
    vec3 fgm=fg.rgb*fg.a;
    float ia=1.0-fg.a;
    float a=(fg.a + bg.a * ia);
    vec3 rgb;
    if (a!=0.0) {
        rgb=(fgm + bgm * ia) / a;
    }
    else {
        rgb=vec3(0.0,0.0,0.0);
    }
    return vec4(rgb,a);
}

#pragma glslify: export(blend)