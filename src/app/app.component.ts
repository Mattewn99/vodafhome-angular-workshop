import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CameraService } from './camera/services/camera.service';
import { CpuPlayerComponent } from './game/components/cpu-player/cpu-player.component';
import { PlayerComponent } from './game/components/player/player.component';
import { ResultComponent } from './game/components/result/result.component';
import { GameStatus, GameStatusType } from './game/enums/game-status.enum';
import { GameService } from './game/services/game.service';
import { Gesture, GestureType } from './prediction/gestures';
import { PredictionService } from './prediction/services/prediction.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayerComponent, CpuPlayerComponent, ResultComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('playerVideo') playerVideo!: ElementRef<HTMLVideoElement>;

  gameStatus: GameStatusType = GameStatus.IDLE;

  playerGesture: GestureType = Gesture.UNKNOWN;
  cpuGesture: GestureType = Gesture.UNKNOWN;

  private readonly predictionService = inject(PredictionService);
  private readonly cameraService = inject(CameraService);
  private readonly gameService = inject(GameService);

  ngAfterViewInit(): void {
    const videoElement = this.playerVideo.nativeElement;
    const config: MediaStreamConstraints = { video: true };

    try {
      Promise.all([
        this.cameraService.initCamera(videoElement, config),
        this.predictionService.init(),
      ]).then(() => {
        setTimeout(() => {
          this.startPrediction();
        }, 1000);
      });
    } catch (error) {
      console.error('Failed to initialize the game:', error);
    }
  }

  private startPrediction(): void {
    this.predictionService
      .startPrediction(this.playerVideo.nativeElement)
      .subscribe((gesture) => {
        if (gesture !== Gesture.UNKNOWN) {
          const cpuGesture = this.gameService.getCpuGesture();

          this.cpuGesture = cpuGesture;
          this.playerGesture = gesture;

          const result = this.gameService.getMatchResult(gesture, cpuGesture);

          this.gameStatus = result;
          this.gameService.setMatchUI(result);
        }
      });
  }
}
