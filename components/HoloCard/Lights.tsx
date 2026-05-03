"use client";

// Day 3 lighting — ambient + key directional + cool fill + hemisphere for
// a sense of depth on plain meshStandardMaterial planes. Self-contained;
// no external HDR/IBL fetch (drei's <Environment preset> would pull from
// CDN — that's the day-4+ upgrade once we want true reflections).

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#a9d2ff", "#202028", 0.4]} />
      <directionalLight position={[3, 4, 5]} intensity={1.0} />
      <directionalLight
        position={[-2, -1, 2]}
        intensity={0.35}
        color="#a9d2ff"
      />
    </>
  );
}
