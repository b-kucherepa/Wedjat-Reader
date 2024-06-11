"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { shiftArrayIndexInLoop, generateRandomBetween } from "./utils";
import { BgImage } from "./customClasses";

import MenuCurtain from "./menuCurtain";
import RenderArea from "./renderArea";

const DEFAULT_TEXT_VALUES: {
  text: string;
  color: string;
  size: number;
  family: string;
} = {
  text: `Swipe right or click the left side of screen to open menu, then click "select text file - Choose files" to load a text file`,
  color: "#FFFFFF",
  size: 16,
  family: "Times New Roman",
};

const DEFAULT_BG_IMAGE: BgImage = new BgImage(
  "/back.jpg",
  "default image",
  378940,
  0
);

const DEFAULT_BG_VALUES: {
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

const DEFAULT_SLIDESHOW_VALUES: {
  interval: number;
  isRandom: boolean;
  isEnabled: boolean;
} = {
  interval: 5000,
  isRandom: false,
  isEnabled: false,
};

export const TextContext = createContext({
  values: DEFAULT_TEXT_VALUES,
  setValues: (_: any) => {
    _;
  },
});

export const BgContext = createContext({
  values: DEFAULT_BG_VALUES,
  setValues: (_: any) => {
    _;
  },
});

export const SlideshowContext = createContext({
  values: DEFAULT_SLIDESHOW_VALUES,
  setValues: (_: any) => {
    _;
  },
});

export default function Main() {
  const [textValues, setTextValues] = useState(DEFAULT_TEXT_VALUES);
  const [bgValues, setBgValues] = useState(DEFAULT_BG_VALUES);
  const [slideshowValues, setSlideshowValues] = useState(
    DEFAULT_SLIDESHOW_VALUES
  );

  const textContextHook = {
    values: textValues,
    setValues: setTextValues,
  };

  const bgContextHook = {
    values: bgValues,
    setValues: setBgValues,
  };

  const slideshowContextHook = {
    values: slideshowValues,
    setValues: setSlideshowValues,
  };

  const slideshowTimer = useRef(setTimeout(() => {}, 0));

  useEffect(() => {
    document.body.style.backgroundImage =
      `url(${bgValues.bgImages[bgValues.imageIndex]?.file})` ??
      DEFAULT_BG_IMAGE;
    document.body.style.backgroundSize = bgValues.size ?? "cover";
    document.body.style.backgroundRepeat = bgValues.repeat ?? "cover";
  });

  useEffect(() => {
    clearInterval(slideshowTimer.current);

    if (slideshowValues.isEnabled) {
      slideshowTimer.current = setTimeout(() => {
        let indexShift = 0;

        if (slideshowValues.isRandom) {
          indexShift = generateRandomBetween(1, bgValues.bgImages.length);
        } else {
          indexShift = 1;
        }

        const newImageIndex = shiftArrayIndexInLoop(
          bgValues.bgImages.length,
          bgValues.imageIndex,
          indexShift
        );

        setBgValues({
          ...bgValues,
          bgImages: bgValues.bgImages,
          imageIndex: newImageIndex,
        });
      }, slideshowValues.interval);
    }
  }, [slideshowValues, bgValues]);

  return (
    <main id="mainText" className={`size-full	bg-cover`}>
      <TextContext.Provider value={textContextHook}>
        <BgContext.Provider value={bgContextHook}>
          <SlideshowContext.Provider value={slideshowContextHook}>
            <MenuCurtain></MenuCurtain>
            <RenderArea></RenderArea>
          </SlideshowContext.Provider>
        </BgContext.Provider>
      </TextContext.Provider>
    </main>
  );
}
