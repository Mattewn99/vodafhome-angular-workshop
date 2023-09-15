export const SampleGesture = {
  create: (): Promise<HTMLImageElement> => {
    const image = new Image(640, 480);

    image.src =
      'data:image/png;base64,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';

    return new Promise((resolve) => {
      image.onload = function () {
        resolve(image);
      };
    });
  },
};