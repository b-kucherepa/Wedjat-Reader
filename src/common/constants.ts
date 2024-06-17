import { BgImage } from "./customClasses";

export const SWIPE_PERCENTAGE: number = 40;
export const CLICK_MARGIN_PERCENTAGE: number = 15;

export const DEFAULT_TEXT_VALUES: {
  text: string;
  color: string;
  size: number;
  family: string;
  hMargin: number;
  vMargin: number;
} = {
  text: `Click the upper side of screen, or swipe down, to open menu, then click "Text -> load -> No file chosen" to load a text file`,
  color: "#FFFFFF",
  size: 16,
  family: "Times New Roman",
  hMargin: 15,
  vMargin: 15
};

export const DEFAULT_BG_IMAGE: BgImage = new BgImage(
  "/default.png",
  "default image",
  378940,
  0
);

export const DEFAULT_BG_VALUES: {
  bgImages: BgImage[];
  imageIndex: number;
  size: string;
  repeat: string;
} = {
  bgImages: [DEFAULT_BG_IMAGE],
  imageIndex: 0,
  size: "cover",
  repeat: "no-repeat"
};

export const DEFAULT_SLIDESHOW_VALUES: {
  interval: number;
  isRandom: boolean;
  isEnabled: boolean;
} = {
  interval: 5000,
  isRandom: false,
  isEnabled: false,
};