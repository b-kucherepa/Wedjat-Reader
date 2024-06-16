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
import OptionTextHMargin from "./optionTextHMargin";
import OptionTextVMargin from "./optionTextVMargin";

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
      className="curtain"
      style={{
        width: `${curtainWidth}%`,
      }}
    >
      <div
        className="menu-content"
        style={{
          scale: curtainWidth > HINT_WIDTH ? curtainWidth / 100 : 0,
        }}
      >
        <label className="menu-section-text">Text:</label>

        <label>load:</label>
        <div>
          <BtnLoadText />
        </div>

        <label>color:</label>
        <div>
          <OptionTextColor />
        </div>

        <label>size:</label>
        <div>
          <OptionTextSize />
        </div>

        <label>hori&shy;zontal margin:</label>
        <div>
          <OptionTextHMargin /> (px)
        </div>

        <label>verti&shy;cal margin:</label>
        <div>
          <OptionTextVMargin/> (px)
        </div>

        <hr className="menu-separator" />

        <label className="menu-section-bg">Back&shy;ground:</label>

        <label>load:</label>
        <div>
          <BtnLoadBg />
        </div>

        <label>sort by:</label>
        <div>
          <OptionBgSortBy />
        </div>

        <label>select:</label>
        <div>
          <OptionBgSelect />
        </div>

        <label>layout and size:</label>
        <div>
          <OptionBgSize />
        </div>

        <hr className="menu-separator" />

        <label className="menu-section-slideshow">Slide&shy;show:</label>

        <label>inter&shy;val:</label>
        <div>
          <OptionShowInterval /> (s)
        </div>

        <label>rando&shy;mize:</label>
        <div>
          <OptionShowRandom />
        </div>

        <label>launch:</label>
        <div>
          <BtnShowStart onClick={() => setCurtainWidth(COLLAPSED_WIDTH)} />
        </div>

        <hr className="hidden" />
      </div>

      <button
        className="btn-curtain-close"
        onClick={() => setCurtainWidth(COLLAPSED_WIDTH)}
      >
        &times;
      </button>
    </div>
  );
}

export default MenuCurtain;
