#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

float shape(int sides, vec2 st) {
    // Angle and radius from the current pixel
    float a = atan(st.x, st.y) + PI;
    float r = TWO_PI / float(sides);
    // Shaping function that modulate the distance
    return cos(floor(.5 + a / r) * r - a) * length(st);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    vec3 color = vec3(0.0);
    float d = 0.0;

    // Remap the space to -1. to 1.
    st = st * 2. - 1.;

    float tri1 = shape(3, st);
    float tri2 = shape(3, st * 1.3);
    float tri3 = shape(3, st * 3.);
    float tri4 = shape(3, st * 6.);

    float block1 = shape(4, (vec2(st.x / 5., st.y) - vec2(0.06, -0.01)) * 7.);
    float block2 = shape(4, (vec2(st.x / 4., st.y) - vec2(0.05, 0.08)) * 12.);
    float block3 = shape(4, (vec2(st.x / 4., st.y) - vec2(0.08, -0.1)) * 12.);

    color = vec3(1.0 - smoothstep(.4, .41, tri1));
    color -= vec3(1.0 - smoothstep(.4, .41, tri2));
    color += vec3(1.0 - smoothstep(.4, .41, tri3));
    color -= vec3(1.0 - smoothstep(.4, .41, tri4));
    color += vec3(1.0 - smoothstep(.4, .41, block2));
    color += vec3(1.0 - smoothstep(.4, .41, block3));
    color = min(color, vec3(1.));
    color -= vec3(1.0 - smoothstep(.4, .41, block1));
    // color = vec3(d);

    gl_FragColor = vec4(color, 1.0);
}
