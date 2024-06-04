export function shiftArrayIndexInLoop(
  arrayLength: number,
  currentIndex: number,
  shiftBy: number
): number {
  const rawNewIndex: number = (currentIndex + shiftBy)%arrayLength;

  if (rawNewIndex < 0) {
    return arrayLength - 1 + rawNewIndex;
  } else {
    return rawNewIndex;
  }
}

export function generateRandomBetween(min: number, max: number) {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
