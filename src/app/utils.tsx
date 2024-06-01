export function shiftArrayIndexInLoop(
  arrayLength: number,
  currentIndex: number,
  shiftBy: number
): number {
  const rawNewIndex = (currentIndex + shiftBy)%arrayLength;

  console.log(rawNewIndex, arrayLength, currentIndex);

  if (rawNewIndex < 0) {
    return arrayLength - 1 + rawNewIndex;
  } else {
    return rawNewIndex;
  }
}

export function generateRandomBetween(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
