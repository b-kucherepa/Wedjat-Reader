export function shiftArrayIndexInLoop(
  arrayLength: number,
  currentIndex: number,
  shiftBy: number
): number {
  const rawNewIndex: number = (currentIndex + shiftBy) % arrayLength;

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

export function formatBytes(bytes: number) {
  const KILO = 1024;
  const UNITS = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  if (!+bytes) return `0 ${UNITS[0]}`;

  const power = Math.floor(Math.log(bytes) / Math.log(KILO));

  return `${parseFloat((bytes / Math.pow(KILO, power)).toFixed(2))} ${
    UNITS[power]
  }`;
}

export function getScreenPercentSize(
  percent: number,
  isHeight: boolean
): number {
  const screenSize = isHeight ? window.innerHeight : window.innerWidth;

  if (percent >= 0) {
    return (screenSize * percent) / 100;
  } else {
    return screenSize + (screenSize * percent) / 100;
  }
}

export function clampNumber(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}

export function loadState(itemName: string): unknown {
  try {
    const serializedState = localStorage.getItem(itemName);
    return serializedState ? JSON.parse(serializedState) : {};
  } catch (err) {
    console.log(err);
    return {};
  }
}

export function saveState(itemName: string, data: unknown): void {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(itemName, serializedState);
  } catch (err) {
    console.log(err);
  }
}

export function removeState(itemName: string): void {
  try {
    localStorage.removeItem(itemName);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
