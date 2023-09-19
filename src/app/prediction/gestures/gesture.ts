export const Gesture = {
  UNKNOWN: 'unknown',
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
} as const;

export type GestureType = (typeof Gesture)[keyof typeof Gesture];

export const GESTURES = Object.values(Gesture);
