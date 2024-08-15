export function normalizeArrayIndex(
  currentIndex: number,
  arrayLength: number
): number {
  const rawNewIndex: number = currentIndex % arrayLength;

  if (rawNewIndex < 0) {
    return arrayLength - 1 + rawNewIndex;
  } else {
    return rawNewIndex;
  }
}

export function generateRandomBetween(min: number, max: number): number {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function formatBytes(bytes: number): string {
  const KILO: number = 1024;
  const UNITS: string[] = [
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

  const power: number = Math.floor(Math.log(bytes) / Math.log(KILO));

  return `${parseFloat((bytes / Math.pow(KILO, power)).toFixed(2))} ${
    UNITS[power]
  }`;
}

export function getScreenPercentSize(
  percent: number,
  isHeight: boolean
): number {
  const screenSize: number = isHeight ? window.innerHeight : window.innerWidth;

  if (percent >= 0) {
    return (screenSize * percent) / 100;
  } else {
    return screenSize + (screenSize * percent) / 100;
  }
}

export function clampNumber(number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max);
}
