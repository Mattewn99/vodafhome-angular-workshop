declare module 'fingerpose' {
  export class GestureEstimator {
    constructor(getures: GestureDescription[]);

    estimate<T>(
      keypoints3D: Coords3D,
      minScore: number
    ): { gestures: Array<{ name: T; score: number }> };
  }

  export class GestureDescription {
    constructor(gestureName: string);

    addCurl(finger: Finger, curl: FingerCurl, contrib = 1.0): void;

    addDirection(
      finger: Finger,
      position: FingerDirection,
      contrib = 1.0
    ): void;
  }

  export const Finger = {
    Thumb: 0,
    Index: 1,
    Middle: 2,
    Ring: 3,
    Pinky: 4,

    all: [0, 1, 2, 3, 4],
  } as const;

  export const FingerCurl = {
    NoCurl: 0,
    HalfCurl: 1,
    FullCurl: 2,
  } as const;

  export const FingerDirection = {
    VerticalUp: 0,
    VerticalDown: 1,
    HorizontalLeft: 2,
    HorizontalRight: 3,
    DiagonalUpRight: 4,
    DiagonalUpLeft: 5,
    DiagonalDownRight: 6,
    DiagonalDownLeft: 7,
  } as const;
}
