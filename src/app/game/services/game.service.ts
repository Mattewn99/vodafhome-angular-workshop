import { Injectable, inject } from '@angular/core';
import { GESTURES } from 'src/app/prediction/gestures/gesture';
import { AudioEffect } from '../enums/audio-effect.enum';
import { GameStatus, GameStatusType } from '../enums/game-status.enum';
import { Gesture, GestureType } from './../../prediction/gestures';
import { AudioService } from './audio.service';
import { ConfettiService } from './confetti.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly confettiService = inject(ConfettiService);
  private readonly audioService = inject(AudioService);

  public getCpuGesture(): GestureType {
    const gestures = GESTURES.filter((gesture) => {
      const exludedGestures: GestureType[] = [Gesture.UNKNOWN];

      return !exludedGestures.includes(gesture);
    });

    const randomNum = Math.floor(Math.random() * gestures.length);

    return gestures[randomNum];
  }

  public getMatchResult(
    playerGesture: GestureType,
    cpuGesture: GestureType
  ): GameStatusType {
    if (playerGesture === cpuGesture) {
      return GameStatus.DRAW;
    }

    return GameStatus.CPU_WINS;
  }

  public setMatchUI(gameStatus: GameStatusType): void {
    switch (gameStatus) {
      case GameStatus.PLAYER_WINS: {
        this.confettiService.fireworks();
        this.audioService.play(AudioEffect.PLAYER_WINS);
        break;
      }
      case GameStatus.CPU_WINS: {
        this.audioService.play(AudioEffect.CPU_WINS);
        break;
      }
      default: {
        break;
      }
    }
  }
}
