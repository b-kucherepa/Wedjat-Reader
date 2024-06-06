"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { shiftArrayIndexInLoop, generateRandomBetween } from "./utils";
import { BgImage } from "./customClasses";

import MenuCurtain from "./menuCurtain";
import RenderArea from "./renderArea";

const DEFAULT_BG_IMAGE: BgImage = new BgImage("/back.jpg", "default image", 378940, 0);


const DEFAULT_RENDER_VALUES: {
  text: string;
  bgImages: BgImage[];
  imageIndex: number;
} = {
  text: `Swipe right or click the left side of screen to open menu, then click "select text file - Choose files" to load a text file`,
  bgImages: [DEFAULT_BG_IMAGE],
  imageIndex: 0,
};

const DEFAULT_SLIDESHOW_VALUES: {
  interval: number;
  isRandom: boolean;
  isEnabled: boolean;
} = {
  interval: 1000,
  isRandom: false,
  isEnabled: false,
};

export const RenderContext = createContext({
  values: DEFAULT_RENDER_VALUES,
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
  const [renderValues, setRenderValues] = useState(DEFAULT_RENDER_VALUES);
  const [slideshowValues, setSlideshowValues] = useState(
    DEFAULT_SLIDESHOW_VALUES
  );
  const slideshowTimer = useRef(setTimeout(() => {}, 0));

  const renderContextHook = {
    values: renderValues,
    setValues: setRenderValues,
  };
  const slideshowContextHook = {
    values: slideshowValues,
    setValues: setSlideshowValues,
  };

  useEffect(() => {
    document.body.style.backgroundImage =
      `url(${renderValues.bgImages[renderValues.imageIndex]?.file})` ??
      DEFAULT_BG_IMAGE;
  });

  useEffect(() => {
    clearInterval(slideshowTimer.current);

    if (slideshowValues.isEnabled) {
      slideshowTimer.current = setTimeout(() => {
        let indexShift = 0;

        if (slideshowValues.isRandom) {
          indexShift = generateRandomBetween(1, renderValues.bgImages.length);
        } else {
          indexShift = 1;
        }

        const newImageIndex = shiftArrayIndexInLoop(
          renderValues.bgImages.length,
          renderValues.imageIndex,
          indexShift
        );

        setRenderValues({
          text: renderValues.text,
          bgImages: renderValues.bgImages,
          imageIndex: newImageIndex,
        });
      }, slideshowValues.interval);
    }
  }, [slideshowValues, renderValues]);

  return (
    <main id="mainText" className={`size-full	bg-cover`}>
      <RenderContext.Provider value={renderContextHook}>
        <SlideshowContext.Provider value={slideshowContextHook}>
          <MenuCurtain></MenuCurtain>
          <RenderArea></RenderArea>
        </SlideshowContext.Provider>
      </RenderContext.Provider>
    </main>
  );
}
