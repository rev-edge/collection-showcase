// Day 4 — vertex shader for the holo card.
// Passes UV, world-space normal, and the world-space view direction
// (fragment → camera) so the fragment shader can compute fresnel as the
// card tilts. modelMatrix-only for the normal because we never non-uniformly
// scale (rotation+translation only); inverse-transpose is unnecessary.

export default /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;
