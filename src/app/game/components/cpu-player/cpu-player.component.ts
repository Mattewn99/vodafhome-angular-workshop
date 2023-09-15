import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameStatus, GameStatusType } from '../../enums/game-status.enum';

@Component({
  selector: 'app-cpu-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cpu-player.component.html',
  styleUrls: ['./cpu-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CpuPlayerComponent {
  @Input({ required: true })
  set gameStatus(value: GameStatusType) {
    this._gameStatus = value;
    this.cpuPlayerImage =
      this.playerImages[value as keyof typeof this.playerImages] ||
      '/assets/images/cpu-player/cpu-player-idle.svg';
  }
  get gameStatus() {
    return this._gameStatus;
  }

  cpuPlayerImage!: string;

  private playerImages = {
    [GameStatus.CPU_WINS]: '/assets/images/cpu-player/cpu-player-win.svg',
    [GameStatus.PLAYER_WINS]: '/assets/images/cpu-player/cpu-player-lose.svg',
  };
  private _gameStatus!: GameStatusType;
}
