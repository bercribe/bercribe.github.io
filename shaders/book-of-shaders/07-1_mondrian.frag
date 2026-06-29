#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 blc, vec2 trc, vec2 st, float smoothing) {
    vec2 bl = smoothstep(blc, blc + vec2(smoothing), st);
    float pct = bl.x * bl.y;

    vec2 tr = vec2(1.) - smoothstep(trc - vec2(smoothing), trc, st);
    pct *= tr.x * tr.y;

    return pct;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    float pct = 0.;
    color = vec3(pct);

    color += rect(vec2(0.), vec2(.2, .6), st, 0.);

    color += rect(vec2(.25, 0.), vec2(.7, .1), st, 0.);
    color.b += rect(vec2(.75, 0.), vec2(.9, .1), st, 0.);
    color.b += rect(vec2(.95, 0.), vec2(1., .1), st, 0.);

    color += rect(vec2(.25, .15), vec2(.7, .6), st, 0.);
    color += rect(vec2(.75, .15), vec2(.9, .6), st, 0.);
    color += rect(vec2(.95, .15), vec2(1., .6), st, 0.);

    color.r += rect(vec2(0., .65), vec2(.05, .8), st, 0.);
    color.r += rect(vec2(.1, .65), vec2(.2, .8), st, 0.);
    color += rect(vec2(.25, .65), vec2(.7, .8), st, 0.);
    color += rect(vec2(.75, .65), vec2(.9, .8), st, 0.);
    color.rg += rect(vec2(.95, .65), vec2(1., .8), st, 0.);

    color.r += rect(vec2(0., .85), vec2(.05, 1.), st, 0.);
    color.r += rect(vec2(.1, .85), vec2(.2, 1.), st, 0.);
    color += rect(vec2(.25, .85), vec2(.7, 1.), st, 0.);
    color += rect(vec2(.75, .85), vec2(.9, 1.), st, 0.);
    color.rg += rect(vec2(.95, .85), vec2(1., 1.), st, 0.);

    gl_FragColor = vec4(color, 1.0);
}
