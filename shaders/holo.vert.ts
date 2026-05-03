// V0 vertex shader — passthrough + varyings (uv, normal, viewDir).
// Real shader code lands in week 1 day 4. Stored as a TS template string instead of
// a .glsl file because Next 16 / Turbopack does not expose a zero-config raw-string
// loader; .ts strings are functionally equivalent at runtime. Use a GLSL-in-JS
// VS Code extension for syntax highlighting on the /* glsl */ tag.

export default /* glsl */ `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
