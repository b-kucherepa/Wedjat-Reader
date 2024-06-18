"use client";
import { useEffect } from "react";

import { STORE_ITEM_NAME, SWIPE_PERCENTAGE } from "../common/constants";

import MenuCurtain from "../components/menuCurtain";
import RenderArea from "../components/renderArea";

import { SwipeHandler } from "@/common/customClasses";
import { Provider, useSelector } from "react-redux";
import store from "@/store/store";
import { saveState } from "@/common/utils";

export default function Main() {
  useEffect(() => {
    const swipeHandler = new SwipeHandler(document, SWIPE_PERCENTAGE);
    store.subscribe(() => saveState(STORE_ITEM_NAME, store.getState()))
  }, []);

  return (
    <main id="mainText">
      <Provider store={store}>
        <MenuCurtain></MenuCurtain>
        <RenderArea></RenderArea>
      </Provider>
    </main>
  );
}
