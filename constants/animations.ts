export const AnimationDuration = {
  fast: 150,
  normal: 250,
  slow: 350,
  verySlow: 500,
} as const;

export const AnimationEasing = {
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
  easeOut: [0.0, 0.0, 0.2, 1] as const,
  easeIn: [0.4, 0.0, 1, 1] as const,
  sharp: [0.4, 0.0, 0.6, 1] as const,
} as const;
