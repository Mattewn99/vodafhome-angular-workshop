import { Finger, FingerCurl, GestureDescription } from 'fingerpose';
import { Gesture } from './gesture';

const PaperGesture = new GestureDescription(Gesture.PAPER);

for (const finger of Finger.all) {
  PaperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

export { PaperGesture };
