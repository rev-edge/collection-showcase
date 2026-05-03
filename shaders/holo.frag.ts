// Day 4.2 — fragment shader. Adds a `uHoloRegion` rectangular UV mask so
// the holo only affects the card's artwork window, not the PSA label /
// white frame / yellow card border / text region. Real holo cards behave
// this way — Day 4.1 user feedback was that the unmasked effect looked
// wrong because the whole slab was iridescent.
//
// Effect layers (unchanged from 4.1):
//   1. Diagonal rainbow bands (palette-ramp) — visible at rest.
//   2. High-frequency sparkle stripes (the "shine") — sharp peaks.
//   3. Specular hot spot tracking the pointer.
//
// Mask: soft-edged axis-aligned rectangle via smoothstep. ALL holo
// contributions (bands, sparkle, hot spot, rim glow) multiply by mask
// so the masked region's outside is exactly the raw albedo.

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
uniform vec2 uTilt;
uniform vec4 uHoloRegion; // (xMin, yMin, xMax, yMax) in UV

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

// Soft-edged rectangle mask in UV space. 1.0 inside, 0.0 outside, with a
// thin smoothstep fade at the boundary so the mask edge doesn't read as
// a hard sprite outline.
float regionMask(vec2 uv) {
  float fade = 0.015;
  float xMask = smoothstep(uHoloRegion.x - fade, uHoloRegion.x + fade, uv.x)
              * (1.0 - smoothstep(uHoloRegion.z - fade, uHoloRegion.z + fade, uv.x));
  float yMask = smoothstep(uHoloRegion.y - fade, uHoloRegion.y + fade, uv.y)
              * (1.0 - smoothstep(uHoloRegion.w - fade, uHoloRegion.w + fade, uv.y));
  return xMask * yMask;
}

void main() {
  vec3 albedo = texture2D(uAlbedo, vUv).rgb;

  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  float ndotv = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - ndotv, 1.2);

  // Diagonal band coordinate. Tilt-driven offset, time drift.
  float band = (vUv.x + vUv.y * 0.8) * uFrequency
             + uTilt.x * 4.0 - uTilt.y * 4.0
             + uTime * uSpeed * 0.6;

  vec3 irid = paletteRamp(band * 0.15);
  float sparkle = pow(0.5 + 0.5 * sin(band * 3.0), 8.0);

  vec2 hotCenter = vec2(0.5) - uTilt * 0.4;
  float hot = smoothstep(0.45, 0.0, length(vUv - hotCenter));

  vec3 colored = irid * (0.4 + sparkle * 1.2);
  vec3 highlight = vec3(1.0) * (sparkle * 0.7 + hot * 0.5);

  float tiltMag = clamp(length(uTilt), 0.0, 1.0);
  float strength = uIntensity * (0.5 + 0.4 * fresnel + 0.5 * tiltMag);

  // Mask all holo contributions to the artwork rectangle.
  float mask = regionMask(vUv);

  vec3 color = albedo + (colored + highlight) * strength * 0.55 * mask;

  float rim = smoothstep(0.5, 1.0, fresnel);
  color += uRimColor * rim * 0.5 * mask;

  gl_FragColor = vec4(color, 1.0);
}
`;
