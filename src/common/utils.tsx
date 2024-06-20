import { ReducerList } from "@/store/store";

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

  const power:number = Math.floor(Math.log(bytes) / Math.log(KILO));

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

export function clampNumber(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}

export function saveState(data: ReducerList): void {
  try {
    const itemNames: string[] = Object.keys(data);
    for (let item of itemNames) {
      const serializedState: string = JSON.stringify(data[item as keyof ReducerList]);
      localStorage.setItem(item, serializedState);
    }
  } catch (err) {
    console.log(err);
  }
}

export function loadState(): ReducerList {
  try {
    const itemNames: string[] = Object.keys(localStorage);
    let data: ReducerList = {};
    for (let item of itemNames) {
      const serializedState: string | null = localStorage.getItem(item);
      if (serializedState) {
        const parsedData: Object = JSON.parse(serializedState);
        data = { ...data, [item as keyof ReducerList]: parsedData };
      } else {
        return {};
      }
    }
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export function removeState(): void {
  try {
    const itemNames: string[] = Object.keys(localStorage);
    for (let item of itemNames) {
      localStorage.removeItem(item);
    }
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
