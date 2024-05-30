"use client";
import { createContext, useEffect, useRef, useState } from "react";

import MenuCurtain from "./menuCurtain";
import RenderArea from "./renderArea";
import TextLoadBtn from "./textLoadBtn";
import BgLoadBtn from "./bgLoadBtn";
import BgSelect from "./bgSelect";

const DEFAULT_BG_IMAGE: [string, string] = ["/back.jpg", "default image"];
 
export const RenderContext = createContext({
  values: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    bgImages: [DEFAULT_BG_IMAGE],
    imageIndex: 0,
  },
  setValues: (_: any) => {
    _;
  },
});

export default function Main() {
  const [values, setValues] = useState({
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    bgImages: [DEFAULT_BG_IMAGE],
    imageIndex: 0,
  });
  const renderContextHook = { values, setValues };

  useEffect(() => {
    console.log(values.bgImages);
    document.body.style.backgroundImage =
      `url(${values.bgImages[values.imageIndex][0]})` ?? DEFAULT_BG_IMAGE;
  });

  return (
    <main id="mainText" className={`size-full	bg-cover`}>
      <RenderContext.Provider value={renderContextHook}>
        <MenuCurtain id="navCurtain">
          <TextLoadBtn />
          <BgLoadBtn />
          <BgSelect />
        </MenuCurtain>
        <RenderArea id="renderArea"></RenderArea>
      </RenderContext.Provider>
    </main>
  );
}
