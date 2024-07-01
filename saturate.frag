precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform float saturation;

void main() {
    vec2 uv = vTexCoord;

    // Flip the texture vertically
    uv.y = 1.0 - uv.y;

    vec4 color = texture2D(tex0, uv);

    // Convert the color to grayscale
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Interpolate between the grayscale value and the original color based on the saturation amount
    vec3 saturatedColor = mix(vec3(gray), color.rgb, saturation);

    // Set the output color
    gl_FragColor = vec4(saturatedColor, color.a);
}
