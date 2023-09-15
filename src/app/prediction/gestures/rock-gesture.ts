import { Finger, FingerCurl, GestureDescription } from 'fingerpose';
import { Gesture } from './gesture';

const RockGesture = new GestureDescription(Gesture.ROCK);

RockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
RockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  RockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  RockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

export { RockGesture };
