// Basced on @patriciogv
// http://patriciogonzalezvivo.com
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in vec2 st) {
    return fract(sin(dot(st.xy,
                vec2(12.9898, 78.233))) *
            43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

#define OCTAVES 4
float fbm(in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;

    vec2 travel_dir = vec2(0.0, -1.0);
    float rad = 4.;
    mat2 rot = mat2(cos(rad), sin(rad),
            -sin(rad), cos(rad));
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        vec2 p = st + u_time * travel_dir;
        value += amplitude * noise(p);
        st *= 2.;
        amplitude *= .5;
        travel_dir = rot * travel_dir;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);
    float f = fbm(st * 3.0);
    // color += f;
    color += step(0.5, f);

    gl_FragColor = vec4(color, 1.0);
}
