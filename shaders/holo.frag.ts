// Day 4.1 — fragment shader rewrite. The first-pass version was too subtle:
// it derived all motion from view angle, which barely changed across our
// flat plane at a small tilt range. The user reported "no detectable
// responsiveness or shine" — failing the visual gate.
//
// This version drives the holo from a `uTilt` uniform pushed from useTilt
// each frame. Three layered elements are visible even at rest:
//   1. Diagonal rainbow bands across the surface (palette-ramp driven).
//   2. High-frequency sparkle stripes (the actual "shine"; bright peaks).
//   3. A bright hot spot that tracks the pointer (the "wet" reflection).
//
// All elements are additively composited on top of the albedo so they
// brighten visibly. The effect strength rises with both fresnel and tilt
// magnitude so the card "wakes up" when the user interacts.

export default /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uPalette[4];
uniform float uIntensity;
uniform float uFrequency;
uniform float uSpeed;
uniform sampler2D uAlbedo;
uniform vec3 uRimColor;
uniform float uRimWidth;
uniform vec2 uTilt; // [-1, 1] from useTilt; zero at rest

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
  float ndotv = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - ndotv, 1.2);

  // Diagonal band coordinate. Sweeps across the surface, shifts strongly
  // with tilt so the rainbow visibly moves under the user's pointer.
  float band = (vUv.x + vUv.y * 0.8) * uFrequency
             + uTilt.x * 4.0 - uTilt.y * 4.0
             + uTime * uSpeed * 0.6;

  // Rainbow color from the theme palette.
  vec3 irid = paletteRamp(band * 0.15);

  // High-frequency sparkle stripes — the actual "shine". Sharp peaks via
  // pow(...,8) give thin bright bands rather than a smooth color wash.
  float sparkle = pow(0.5 + 0.5 * sin(band * 3.0), 8.0);

  // Specular hot spot tracking the pointer. Single location on the card
  // (uTilt is uniform across fragments — unlike vViewDir.xy which varies).
  vec2 hotCenter = vec2(0.5) - uTilt * 0.4;
  float hot = smoothstep(0.45, 0.0, length(vUv - hotCenter));

  // Holo overlay — additive layers so the card brightens, not just tints.
  vec3 colored = irid * (0.4 + sparkle * 1.2);
  vec3 highlight = vec3(1.0) * (sparkle * 0.7 + hot * 0.5);

  // Strength: base intensity + fresnel boost + tilt-magnitude boost so the
  // card "wakes up" the more the user interacts.
  float tiltMag = clamp(length(uTilt), 0.0, 1.0);
  float strength = uIntensity * (0.5 + 0.4 * fresnel + 0.5 * tiltMag);

  vec3 color = albedo + (colored + highlight) * strength * 0.55;

  // Rim glow. Threshold lowered so it triggers at moderate tilt, not only
  // grazing angles. Width is theme-controlled.
  float rim = smoothstep(0.5, 1.0, fresnel);
  color += uRimColor * rim * 0.5;

  gl_FragColor = vec4(color, 1.0);
}
`;
