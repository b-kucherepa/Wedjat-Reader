import { useEffect, useRef, useState } from "react";
import { getScreenPercentSize } from "@/common/utils";
import { CLICK_MARGIN_PERCENTAGE } from "@/common/constants";
import { Swipe } from "@/common/customClasses";

import BtnLoadBg from "./btnLoadBg";
import BtnLoadText from "./btnLoadText";
import BtnOptionsReset from "./btnOptionsReset";
import BtnShowStart from "./btnShowStart";
import OptionBgSelect from "./optionBgSelect";
import OptionBgSize from "./optionBgSize";
import OptionBgSortBy from "./optionBgSortBy";
import OptionShowInterval from "./optionShowInterval";
import OptionShowRandom from "./optionShowRandom";
import OptionTextColor from "./optionTextColor";
import OptionTextHMargin from "./optionTextHMargin";
import OptionTextSize from "./optionTextSize";
import OptionTextVMargin from "./optionTextVMargin";

function MenuCurtain() {
  const EXPANDED_HEIGHT: number = 100;
  const COLLAPSED_HEIGHT: number = 0;

  const [curtainHeight, setCurtainHeight] = useState(COLLAPSED_HEIGHT);
  const curtainHeightRef = useRef(curtainHeight);
  curtainHeightRef.current = curtainHeight;

  useEffect(() => {
    function handleSwipeEnd(e: CustomEvent): void {
      if (e.detail.swipe === Swipe.Down) {
        setCurtainHeight(EXPANDED_HEIGHT);
      } else if (e.detail.swipe === Swipe.Up) {
        setCurtainHeight(COLLAPSED_HEIGHT);
      }
    }

    function handleClick(e: MouseEvent): void {
      const isUpperSideTouch: boolean =
        e.clientY <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, true);

      const isCurtainCollapsed: boolean =
        curtainHeightRef.current <= CLICK_MARGIN_PERCENTAGE;

      if (isUpperSideTouch && isCurtainCollapsed) {
        setCurtainHeight(EXPANDED_HEIGHT);
      }
    }

    function handleMouseMove(e: MouseEvent): void {
      const isUpperSideHover: boolean =
        e.clientY <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, true);

      const isCurtainCollapsed: boolean =
        curtainHeightRef.current <= CLICK_MARGIN_PERCENTAGE;

      if (isCurtainCollapsed) {
        setCurtainHeight(
          isUpperSideHover
            ? COLLAPSED_HEIGHT + CLICK_MARGIN_PERCENTAGE
            : COLLAPSED_HEIGHT
        );
      }
    }

    document.addEventListener("swipeend", (e) =>
      handleSwipeEnd(e as CustomEvent)
    );
    document.addEventListener("click", handleClick);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("swipeend", (e) =>
        handleSwipeEnd(e as CustomEvent)
      );
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="navCurtain"
      className="curtain"
      style={{
        height: `${curtainHeight}%`,
        overflowY: curtainHeight > CLICK_MARGIN_PERCENTAGE ? "auto" : "hidden",
      }}
    >
      <div
        className="menu-content"
        style={{
          scale:
            curtainHeight > CLICK_MARGIN_PERCENTAGE ? curtainHeight / 100 : 0,
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
          <OptionTextVMargin /> (px)
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
        <div
          onClick={() => {
            setCurtainHeight(COLLAPSED_HEIGHT);
          }}
        >
          <BtnShowStart />
        </div>

        <hr className="menu-separator" />

        <label className="menu-section-other">Other:</label>

        <label>reset preferences:</label>
        <div>
        <BtnOptionsReset/>
        </div>

        <hr className="menu-separator" />

        <button
          className="btn-curtain-close"
          onClick={() => setCurtainHeight(COLLAPSED_HEIGHT)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default MenuCurtain;
