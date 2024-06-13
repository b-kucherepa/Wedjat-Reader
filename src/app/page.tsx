"use client";
import { useEffect, useRef, useState } from "react";

import { shiftArrayIndexInLoop, generateRandomBetween } from "./utils";
import { DEFAULT_BG_VALUES, DEFAULT_SLIDESHOW_VALUES, DEFAULT_TEXT_VALUES } from "../common/constants";

import MenuCurtain from "../components/menuCurtain";
import RenderArea from "../components/renderArea";

import { BgContext } from "../contexts/bgContext";
import { SlideshowContext } from "../contexts/slideshowContext";
import { TextContext } from "../contexts/textContext";

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
    <main id="mainText">
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
