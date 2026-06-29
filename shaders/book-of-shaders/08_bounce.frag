#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 _scale) {
    return mat2(_scale.x, 0.0,
        0.0, _scale.y);
}

mat2 rotate2d(float _angle) {
    return mat2(cos(_angle), -sin(_angle),
        sin(_angle), cos(_angle));
}

float box(in vec2 _st, in vec2 _size) {
    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(_size,
            _size + vec2(0.001),
            _st);
    uv *= smoothstep(_size,
            _size + vec2(0.001),
            vec2(1.0) - _st);
    return uv.x * uv.y;
}

float cross(in vec2 _st, float _size) {
    return box(_st, vec2(_size, _size / 4.)) +
        box(_st, vec2(_size / 4., _size));
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    // To move the cross we move the space
    // move space from the center to the vec2(0.0)
    vec2 translate = vec2(mod(u_time, 5.0) - 1., 2. * abs(sin(u_time * 3.0)));
    st -= translate * 0.35;
    // rotate the space
    st = rotate2d(PI * (sin(u_time) + u_time)) * st;
    st = scale(vec2(sin(u_time) + 1.0)) * st;
    // move it back to the original place
    st += vec2(0.5);

    // Show the coordinates of the space on the background
    // color = vec3(st.x,st.y,0.0);

    // Add the shape on the foreground
    color += vec3(cross(st, 0.25));

    gl_FragColor = vec4(color, 1.0);
}
