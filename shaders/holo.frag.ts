// Day 4 — first-pass holo fragment shader.
//
// The recipe (per V0 plan §4.3, simplified for first-pass):
//   1. Sample the albedo (the card photo).
//   2. Compute fresnel from view-direction vs world normal — the card tilts
//      via group rotation, so fresnel naturally shifts with tilt.
//   3. Map a parameter t through a 4-color palette ramp; t blends fresnel,
//      a UV gradient, and time so the iridescence breathes even at rest.
//   4. Mix iridescent tint into albedo, weighted more strongly at grazing
//      angles (matches how real holo cards behave).
//   5. Add a rim highlight at the very edge.
//
// Day 4 limitations, knowingly accepted:
//   - The shader applies uniformly to the whole front face, including the
//     PSA red label. A holo mask (so only the card art picks up iridescence)
//     is day-5+ work.
//   - No tone mapping — output is straight RGB, with sRGB texture sampling
//     handled by `texture.colorSpace = SRGBColorSpace` on the JS side.
//   - mediump precision throughout for mobile-Safari friendliness.

export default /* glsl */ `
precision mediump float;

uniform float uTime;
uniform vec3 uPalette[4];
uniform float uIntensity;
uniform float uFrequency;
uniform float uSpeed;
uniform sampler2D uAlbedo;
uniform vec3 uRimColor;
uniform float uRimWidth;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

vec3 paletteRamp(float t) {
  t = fract(t);
  float f = t * 3.0;
  if (f < 1.0) return mix(uPalette[0], uPalette[1], f);
  if (f < 2.0) return mix(uPalette[1], uPalette[2], f - 1.0);
  return mix(uPalette[2], uPalette[3], f - 2.0);
}

void main() {
  vec3 albedo = texture2D(uAlbedo, vUv).rgb;

  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  float ndotv = max(0.0, dot(N, V));
  float fresnel = pow(1.0 - ndotv, 2.0);

  // Iridescence parameter — combines view angle, a UV gradient, and time
  // so the holo shifts as the user tilts and breathes when the card rests.
  float t = (1.0 - ndotv) * uFrequency
          + (vUv.x * 0.6 - vUv.y * 0.4)
          + uTime * uSpeed * 0.5;
  vec3 irid = paletteRamp(t);

  // Tint the albedo with the iridescent color. Multiply-by-tint preserves
  // dark regions (PSA label, card black borders) while colorizing brights.
  // Bias the tint upward (+0.3) so we lighten rather than only darken.
  vec3 holoTint = irid * 0.85 + 0.3;
  vec3 color = mix(albedo, albedo * holoTint, uIntensity * (0.25 + 0.75 * fresnel));

  // Rim highlight at very grazing angles.
  float rim = smoothstep(1.0 - uRimWidth, 1.0, fresnel);
  color += uRimColor * rim * 0.5;

  gl_FragColor = vec4(color, 1.0);
}
`;
