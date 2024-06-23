"use client";

import MenuCurtain from "../components/menuCurtain";
import RenderArea from "../components/renderArea";

import { Provider } from "react-redux";
import store from "@/store/store";

import "./globals.css";

export default function Main() {
  return (
    <main>
      <Provider store={store}>
        <MenuCurtain></MenuCurtain>
        <RenderArea></RenderArea>
      </Provider>
    </main>
  );
}
