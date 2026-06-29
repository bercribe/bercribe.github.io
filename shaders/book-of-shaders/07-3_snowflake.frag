#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(float f, float r) {
    return smoothstep(f - 0.02, f, r) - smoothstep(f, f + 0.02, r);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5) - st;

    float r = length(pos) * 2.0;
    float a = atan(pos.y, pos.x);

    float f;
    // f = cos(a*3.+u_time*2.);
    // f = abs(cos(a*3.+u_time*2.));
    // f = abs(cos(a*2.5+u_time*2.))*.5+.3;
    f = abs(cos(a * 12.) * sin(a * 3. + u_time * 1.)) * .8 + .1;
    // f = smoothstep(-.5,1., cos(a*10.+u_time*5.))*0.2+0.5;

    float h;
    // h = cos(a*3.-u_time*2.)*.5;
    // h = abs(cos(a*3.-u_time*2.))*.5;
    // h = abs(cos(a*2.5-u_time*2.))*.5+.1;
    h = abs(cos(a * 12.) * sin(a * 3. - u_time * 1.)) * .4 + .1;
    // h = smoothstep(-.5,1., cos(a*10.-u_time*5.))*0.05+0.2;

    color = vec3(1. - smoothstep(f, f + 0.02, r));
    color -= vec3(1. - smoothstep(h, h + 0.02, r));

    float pct = 0.;
    pct = plot(f, r);
    // color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color, 1.0);
}
