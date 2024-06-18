"use client";
import { useEffect, useState } from "react";

import {
  DEFAULT_BG_VALUES,
  SWIPE_PERCENTAGE,
} from "../common/constants";

import MenuCurtain from "../components/menuCurtain";
import RenderArea from "../components/renderArea";

import { BgContext } from "../contexts/bgContext";
import { SwipeHandler } from "@/common/customClasses";
import { Provider, useSelector } from "react-redux";
import store from "@/store/store";

export default function Main() {
  const [bgValues, setBgValues] = useState(DEFAULT_BG_VALUES);

  const bgContextHook = {
    values: bgValues,
    setValues: setBgValues,
  };

  useEffect(() => {
    const swipeHandler = new SwipeHandler(document, SWIPE_PERCENTAGE);
  }, []);

  return (
    <main id="mainText">
      <Provider store={store}>
          <BgContext.Provider value={bgContextHook}>
              <MenuCurtain></MenuCurtain>
              <RenderArea></RenderArea>
          </BgContext.Provider>
      </Provider>
    </main>
  );
}
