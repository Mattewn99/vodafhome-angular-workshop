import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public play(audioPath: string): void {
    const audio = new Audio();

    audio.src = audioPath;

    audio.load();
    audio.play();
  }
}
