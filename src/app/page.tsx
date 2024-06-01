"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { shiftArrayIndexInLoop, generateRandomBetween } from "./utils";

import MenuCurtain from "./menuCurtain";
import RenderArea from "./renderArea";

const DEFAULT_BG_IMAGE: [string, string, number] = [
  "/back.jpg",
  "default image",
  Date.now(),
];

export const RenderContext = createContext({
  values: {
    text: `Swipe right or click the left side of screen to open menu, then click "select text file - Choose files" to load a text file`,
    bgImages: [DEFAULT_BG_IMAGE],
    imageIndex: 0,
  },
  setValues: (_: any) => {
    _;
  },
});

export const SlideshowContext = createContext({
  values: {
    interval: 1000,
    isRandom: false,
    isEnabled: false,
  },
  setValues: (_: any) => {
    _;
  },
});

export default function Main() {
  const [renderValues, setRenderValues] = useState({
    text: `Swipe right or click the left side of screen to open menu, then click "select text file - Choose files" to load a text file`,
    bgImages: [DEFAULT_BG_IMAGE],
    imageIndex: 0,
  });

  const [slideshowValues, setSlideshowValues] = useState({
    interval: 2000,
    isRandom: false,
    isEnabled: false,
  });

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
    console.log(renderValues.bgImages);
    document.body.style.backgroundImage =
      `url(${renderValues.bgImages[renderValues.imageIndex][0]})` ??
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
          <MenuCurtain id="navCurtain"></MenuCurtain>
          <RenderArea id="renderArea"></RenderArea>
        </SlideshowContext.Provider>
      </RenderContext.Provider>
    </main>
  );
}
