import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  public async initCamera(
    player: HTMLVideoElement,
    configuration: MediaStreamConstraints
  ): Promise<HTMLVideoElement> {
    const stream = await navigator.mediaDevices.getUserMedia(configuration);

    player.srcObject = stream;

    return player;
  }
}
