"use client";

// V0 stub — client-side resize to ≤1536px longest edge + WebP encode (canvas).
// Implemented in week 2 as part of <ImageDropzone />.
export interface ProcessedImage {
  blob: Blob;
  width: number;
  height: number;
}

export async function resizeAndEncode(
  _file: File,
  _maxEdge = 1536,
): Promise<ProcessedImage> {
  throw new Error("resizeAndEncode not yet implemented (week 2).");
}
