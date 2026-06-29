#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 ms = u_mouse.xy / u_resolution;
    gl_FragColor = vec4(abs(st.x + ms.x - 1.), abs(st.y + ms.y - 1.), (ms.x + ms.y) / 2., 1.0);
}
