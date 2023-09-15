import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose';
import { Gesture } from './gesture';

const HornsGesture = new GestureDescription(Gesture.HORNS);

HornsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
HornsGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);

for (let finger of [Finger.Middle, Finger.Ring]) {
  HornsGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  HornsGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

export { HornsGesture };
