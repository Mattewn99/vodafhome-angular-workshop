import { Injectable } from '@angular/core';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { GestureEstimator } from 'fingerpose';
import {
  Observable,
  filter,
  from,
  interval,
  map,
  scan,
  switchMap,
  takeWhile,
} from 'rxjs';
import {
  Gesture,
  GestureType,
  HornsGesture,
  PaperGesture,
  RockGesture,
  SampleGesture,
  ScissorsGesture,
} from '../gestures';

interface GestureState {
  gesture: GestureType;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private handposeModel!: handpose.HandPose;
  private gestureEstimator!: GestureEstimator;

  public async init(): Promise<void> {
    const gestures = [PaperGesture, RockGesture, ScissorsGesture, HornsGesture];

    this.gestureEstimator = new GestureEstimator(gestures);

    this.handposeModel = await handpose.load();

    const sample = await SampleGesture.create();
    await this.handposeModel.estimateHands(sample, false);
  }

  public startPrediction(
    sourceElement: HTMLVideoElement
  ): Observable<GestureType> {
    const pollingInterval = 200;
    const minDuration = 500;
    const initialState: GestureState = {
      gesture: Gesture.UNKNOWN,
      duration: 0,
    };

    return interval(pollingInterval).pipe(
      switchMap(() => from(this.predictGesture(sourceElement))),
      scan((state: GestureState, newGesture: GestureType) => {
        if (state.gesture === newGesture) {
          return {
            gesture: newGesture,
            duration: state.duration + pollingInterval,
          };
        } else {
          return { gesture: newGesture, duration: 0 };
        }
      }, initialState),
      filter(({ duration }: GestureState) => duration >= minDuration),
      map(({ gesture }: GestureState) => gesture),
      takeWhile((gesture: GestureType) => gesture === Gesture.UNKNOWN, true)
    );
  }

  private async predictGesture(
    sourceElement: HTMLVideoElement
  ): Promise<GestureType> {
    const minimumScore = 9;
    const predictions = await this.handposeModel.estimateHands(
      sourceElement,
      false
    );
    const prediction = predictions.at(0);

    if (prediction) {
      const { landmarks } = prediction;
      const { gestures } = this.gestureEstimator.estimate<GestureType>(
        landmarks,
        minimumScore
      );

      if (gestures.length > 0) {
        const { name } = gestures.reduce((p, c) => (p.score > c.score ? p : c));

        return name;
      }
    }

    return Gesture.UNKNOWN;
  }
}
