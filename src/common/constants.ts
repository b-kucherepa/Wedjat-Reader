import { BgImage } from "./customClasses";

export const DEFAULT_TEXT_VALUES: {
  text: string;
  color: string;
  size: number;
  family: string;
} = {
  text: `Click the left side of screen to open menu, then click "select text file - Choose files" to load a text file`,
  color: "#FFFFFF",
  size: 16,
  family: "Times New Roman",
};

export const DEFAULT_BG_IMAGE: BgImage = new BgImage(
  "/back.jpg",
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