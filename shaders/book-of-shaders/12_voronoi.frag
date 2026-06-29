#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(.0);

    // Cell positions
    vec2 point[5];
    point[0] = vec2(cos(u_time) / 6. + .25, sin(u_time) / 6. + .25);
    point[1] = vec2(sin(u_time) / 6. + .25, cos(2. * u_time) / 6. + .75);
    point[2] = vec2(cos(2. * u_time) / 6. + .75, sin(2. * u_time) / 6. + .75);
    point[3] = vec2(sin(2. * u_time) / 6. + .75, cos(u_time) / 6. + .25);
    point[4] = u_mouse / u_resolution;

    float m_dist = 1.; // minimum distance

    // Iterate through the points positions
    for (int i = 0; i < 5; i++) {
        float dist = distance(st, point[i]);

        // Keep the closer distance
        m_dist = min(m_dist, dist);
    }

    // Draw the min distance (distance field)
    color += m_dist;

    // Show isolines
    // color -= step(.7,abs(sin(50.0*m_dist)))*.3;

    gl_FragColor = vec4(color, 1.0);
}
