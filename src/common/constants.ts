export const MILLISECONDS_IN_SECONDS: number = 1000;

export const SWIPE_PERCENTAGE: number = 40;
export const CLICK_MARGIN_PERCENTAGE: number = 15;

export const DEFAULT_BG_IMAGE: {
  file: string;
  name: string;
  size: number;
  modified: number;
} = {
  file: "default.png",
  name: "default image",
  size: 1411728,
  modified: 0,
};

export namespace StateName {
  export const MENU_STATE = "menuState";
  export const BG_FILES = "bgFiles";
  export const BG_INDEX = "bgIndex";
  export const BG_REPEAT = "bgRepeat";
  export const BG_SIZE = "bgSize";
  export const SHOW_INTERVAL = "showInterval";
  export const SHOW_IS_ENABLED = "showIsEnabled";
  export const SHOW_IS_RANDOM = "showIsRandom";
  export const TEXT_COLOR = "textColor";
  export const TEXT_DATA = "textData";
  export const TEXT_FONT = "textFont";
  export const TEXT_MARGIN_H = "textMarginH";
  export const TEXT_MARGIN_V = "textMarginV";
  export const TEXT_SIZE = "textSize";
  export const TEXT_SPACING = "textSpacing";
}

export namespace StoreActions {
  export const CLOSE = "close";
  export const DECREMENT = "decrement";
  export const HINT = "hint";
  export const INCREMENT = "increment";
  export const OPEN = "open";
  export const PUSH = "push";
  export const RANDOMIZE = "randomize";
  export const RESET = "reset";
  export const SET = "set";
  export const WIPE = "wipe";
}

export const statesToSave: string[] = [
  StateName.BG_REPEAT,
  StateName.BG_SIZE,
  StateName.SHOW_INTERVAL,
  StateName.SHOW_IS_ENABLED,
  StateName.SHOW_IS_RANDOM,
  StateName.TEXT_COLOR,
  StateName.TEXT_FONT,
  StateName.TEXT_MARGIN_H,
  StateName.TEXT_MARGIN_V,
  StateName.TEXT_SIZE,
  StateName.TEXT_SPACING,
];
