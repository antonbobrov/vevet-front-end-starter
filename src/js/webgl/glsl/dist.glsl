float dist(vec2 p0, vec2 pf) {
    return sqrt((pf.x-p0.x)*(pf.x-p0.x)+(pf.y-p0.y)*(pf.y-p0.y));
}

#pragma glslify: export(dist)