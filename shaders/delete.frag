precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform float whiteProbability;

void main() {
    vec2 uv = vTexCoord;

    // Flip the texture vertically
    uv = 1.0 - uv;

    // Sample the texture
    vec4 color = texture2D(tex0, uv);

    // Generate a pseudo-random value based on the fragment's coordinates
    float randomValue = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);

    // Set the color to white if the random value is less than the whiteProbability
    if (randomValue < whiteProbability) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, color.a);
    } else {
        gl_FragColor = color;
    }
}
