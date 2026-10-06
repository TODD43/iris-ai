export function computeFaceMetrics(landmarks: number[][]) {
  const leftCheek = landmarks[116] ?? [0, 0, 0];
  const rightCheek = landmarks[345] ?? [0, 0, 0];
  const noseTip = landmarks[1] ?? [0, 0, 0];
  const upperLip = landmarks[13] ?? [0, 0, 0];
  const lowerLip = landmarks[14] ?? [0, 0, 0];

  const horizontalBalance = 100 - Math.abs(rightCheek[0] - leftCheek[0]) * 220;
  const verticalBalance = 100 - Math.abs(upperLip[1] - lowerLip[1]) * 160;
  const contourPrecision = 100 - Math.abs(noseTip[0] - (leftCheek[0] + rightCheek[0]) / 2) * 180;

  const symmetry = clamp(horizontalBalance, 0, 100);
  const precision = clamp(contourPrecision, 0, 100);
  const blending = clamp(verticalBalance * 0.9 + symmetry * 0.1, 0, 100);

  return {
    symmetry,
    precision,
    blending,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
