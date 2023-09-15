import { Finger, FingerCurl, GestureDescription } from 'fingerpose';
import { Gesture } from './gesture';

const ScissorsGesture = new GestureDescription(Gesture.SCISSORS);

ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

for (const finger of [Finger.Thumb, Finger.Ring, Finger.Pinky]) {
  ScissorsGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScissorsGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

export { ScissorsGesture };
