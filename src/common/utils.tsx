import store from "@/store/store";
import { Preferences } from "@capacitor/preferences";

export function normalizeArrayIndex (
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

export async function saveStates(): Promise<void> {
  const storeState: any = store.getState();

  for (let state in storeState) {
    const serializedState: string = JSON.stringify(storeState[state].value);
    Preferences.set({
      key: state,
      value: serializedState,
    }).catch((error) => console.log(error));
  }
}

export async function loadStates(dispatch: any): Promise<void> {
  const storeState: any = store.getState();

  for (let state in storeState) {
    Preferences.get({
      key: state,
    })
      .then((result) => result.value)
      .then((serializedState) => {
        if (serializedState) {
          return JSON.parse(serializedState);
        }
      })
      .then((readyData) => {
        if (readyData) {
          dispatch({ type: `${state}/set`, payload: readyData });
        }
      })
      .catch((error) => console.log(error));
  }
}

export async function removeStates(dispatch: any): Promise<void> {
  try {
    const itemNames: string[] = await Preferences.keys().then(
      (result) => result.keys
    );
    for (let item of itemNames) {
      Preferences.remove({ key: item });
      dispatch({ type: `${item}/reset`})
    }
  } catch (error) {
    console.log(error);
  }
}
