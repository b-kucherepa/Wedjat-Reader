import { useContext, useEffect, useRef, useState } from "react";
import BtnLoadBg from "./btnLoadBg";
import BtnLoadText from "./btnLoadText";
import OptionBgSelect from "./optionBgSelect";
import OptionBgSortBy from "./optionBgSortBy";
import OptionShowInterval from "./optionShowInterval";
import OptionShowRandom from "./optionShowRandom";
import BtnShowStart from "./btnShowStart";
import OptionTextColor from "./optionTextColor";
import OptionTextSize from "./optionTextSize";
import OptionBgSize from "./optionBgSize";

import { getScreenPercentSize} from "@/common/utils";

function MenuCurtain() {
  const EXPANDED_WIDTH: number = 100;
  const HINT_WIDTH: number = 15;
  const COLLAPSED_WIDTH: number = 0;

  const [curtainWidth, setCurtainWidth] = useState(COLLAPSED_WIDTH);
  const curtainWidthRef = useRef(curtainWidth);
  curtainWidthRef.current = curtainWidth;

  useEffect(() => {
    function handleClick(e: MouseEvent): void {
      const isLeftSideTouch: boolean =
        e.clientX <= getScreenPercentSize(HINT_WIDTH);
      if (isLeftSideTouch) {
        setCurtainWidth(EXPANDED_WIDTH);
      }
    }

    function handleMouseMove(e: MouseEvent): void {
      const isLeftSideHover: boolean =
        e.clientX <= getScreenPercentSize(HINT_WIDTH);

      if (curtainWidthRef.current <= HINT_WIDTH) {
        setCurtainWidth(
          isLeftSideHover ? COLLAPSED_WIDTH + HINT_WIDTH : COLLAPSED_WIDTH
        );
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="navCurtain"
      className="h-full w-0 fixed z-9 top-0 left-0  bg-black overflow-x-hidden duration-500"
      style={{
        width: `${curtainWidth}%`,
      }}
    >
      <div
        className="grid grid-cols-4 auto-rows-min gap-2 relative w-full h-full px-8 py-16 duration-500"
        style={{
          scale: curtainWidth > HINT_WIDTH ? curtainWidth / 100 : 0,
        }}
      >
        <label className="shrink-0 row-span-2">Select files for:</label>

        <label>text:</label>
        <div className="col-span-2">
          <BtnLoadText />
        </div>

        <label>back&shy;ground:</label>
        <div className="col-span-2">
          <BtnLoadBg />
        </div>

        <hr className="col-span-4" />

        <label className="shrink-0 row-span-2">Text:</label>

        <label>color:</label>
        <div className="col-span-2">
          <OptionTextColor />
        </div>

        <label>size:</label>
        <div className="col-span-2">
          <OptionTextSize />
        </div>

        <hr className="col-span-4" />

        <label className="shrink-0 row-span-3">Back&shy;ground:</label>

        <label>sort by:</label>
        <div className="col-span-2">
          <OptionBgSortBy />
        </div>

        <label>select:</label>
        <div className="col-span-2 h-[40vh]	row-span-auto">
          <OptionBgSelect />
        </div>

        <label>layout and size:</label>
        <div className="col-span-2">
          <OptionBgSize />
        </div>

        <hr className="col-span-4" />

        <label className="shrink-0 row-span-3">Slide&shy;show:</label>

        <label>inter&shy;val (s):</label>
        <div className="col-span-2">
          <OptionShowInterval />
        </div>

        <label>rando&shy;mize:</label>
        <div className="col-span-2">
          <OptionShowRandom />
        </div>

        <label>launch:</label>
        <div className="col-span-2">
          <BtnShowStart onClick={() => setCurtainWidth(COLLAPSED_WIDTH)} />
        </div>

        <hr className="col-span-4 invisible" />
      </div>

      <button
        className="absolute top-2 right-8 text-6xl text-center z-5"
        onClick={() => setCurtainWidth(COLLAPSED_WIDTH)}
      >
        &times;
      </button>
    </div>
  );
}

export default MenuCurtain;
