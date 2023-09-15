import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GestureComponent } from '../gesture/gesture.component';
import { Gesture, GestureType } from './../../../prediction/gestures/gesture';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, GestureComponent],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Input({ required: true }) gesture!: GestureType;

  gestureType = Gesture;
}
