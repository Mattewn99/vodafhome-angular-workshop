import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GestureType } from 'src/app/prediction/gestures';
import { Gesture } from './../../../prediction/gestures/gesture';

@Component({
  selector: 'app-gesture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gesture.component.html',
  styleUrls: ['./gesture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestureComponent implements OnInit {
  @Input({ required: true }) gesture!: GestureType;

  gestureImage!: string | null;

  private gestureImages = {
    [Gesture.ROCK]: '/assets/images/gestures/rock.svg',
    [Gesture.PAPER]: '/assets/images/gestures/paper.svg',
    [Gesture.SCISSORS]: '/assets/images/gestures/scissors.svg',
  };

  ngOnInit(): void {
    this.gestureImage =
      this.gestureImages[this.gesture as keyof typeof this.gestureImages] ||
      null;
  }
}
