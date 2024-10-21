export const calculateFrames = (
  display: { from: number; to: number },
  fps: number,
) => {
  const from = (display.from / 1000) * fps;
  const durationInFrames = (display.to / 1000) * fps - from;
  return { durationInFrames };
};

export const populateTransitionIds = (inputArray: string[]): string[] => {
  const newArray: string[] = [];

  for (let i = 0; i < inputArray.length; i++) {
    newArray.push(inputArray[i]);
    if (i < inputArray.length - 1) {
      newArray.push(`${inputArray[i]}-${inputArray[i + 1]}`);
    }
  }

  return newArray;
};

export const clamp = (min: number, max: number, value?: number) => {
  if (!value || isNaN(Number(value))) return 0;
  return Math.max(min, Math.min(max, value)) / 100;
};
