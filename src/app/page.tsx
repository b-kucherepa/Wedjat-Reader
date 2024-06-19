"use client";
import { useEffect } from "react";

import { SWIPE_PERCENTAGE } from "../common/constants";

import MenuCurtain from "../components/menuCurtain";
import RenderArea from "../components/renderArea";

import { SwipeHandler } from "@/common/customClasses";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function Main() {
  useEffect(() => {
    const swipeHandler = new SwipeHandler(document, SWIPE_PERCENTAGE);
  }, []);

  return (
    <main>
      <Provider store={store}>
        <MenuCurtain></MenuCurtain>
        <RenderArea></RenderArea>
      </Provider>
    </main>
  );
}
