#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float PI = 3.141592657;

float circ(float rad, float blur, vec2 center, vec2 st) {
    return 1. - smoothstep(rad - blur, rad, distance(st, center));
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);

    float rad1 = (sin(4. * u_time) + 1.) / 16. + .3;
    vec2 center1 = vec2((sin(u_time) + 1.) / 4. + .25, (cos(u_time) + 1.) / 4. + .25);
    float circ1 = circ(rad1, 0.1, center1, st);
    color += circ1 * vec3(0.780, 0.148, 0.074);

    float rad2 = (sin(u_time) + 1.) / 16. + .3;
    vec2 center2 = vec2((cos(u_time) + 1.) / 4. + .25, (sin(u_time * 2.) + 1.) / 4. + .25);
    float blur2 = (sin(u_time) + 1.) / 4.;
    float circ2 = circ(rad2, blur2, center2, st);
    color += circ2 * vec3(0.324, 0.780, 0.728);

    vec2 focal1 = vec2(sin(-u_time / 2.) / 6. + .5, cos(-u_time / 2.) / 6. + .5);
    vec2 focal2 = vec2(sin(-u_time / 2. + PI) / 6. + .5, cos(-u_time / 2. + PI) / 6. + .5);
    float field1 = pow(distance(st, focal1), distance(st, focal2));
    color += field1 * vec3(0.578, 0.389, 0.830);

    gl_FragColor = vec4(color, 1.0);
}
