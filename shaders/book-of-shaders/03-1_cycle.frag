#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
    gl_FragColor = vec4(abs(sin(u_time)), abs(sin(u_time + 1.)), abs(sin(u_time + 2.)), 1.0);
}
