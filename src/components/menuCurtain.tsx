import { CLICK_MARGIN_PERCENTAGE, STORE_ITEM_NAME } from "@/common/constants";
import { getScreenPercentSize, saveState } from "@/common/utils";

import { Swipe } from "@/common/customClasses";

import { useEffect, useRef, useState } from "react";
import store from "@/store/store";

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

  function expand(): void {
    setCurtainHeight(EXPANDED_HEIGHT);
  }

  function collapse(): void {
    saveState(STORE_ITEM_NAME, store.getState());
    setCurtainHeight(COLLAPSED_HEIGHT);
  }

  function hint(): void {
    setCurtainHeight(CLICK_MARGIN_PERCENTAGE);
  }

  useEffect(() => {
    function handleSwipeEnd(e: CustomEvent): void {
      if (e.detail.swipe === Swipe.Down) {
        expand();
      } else if (e.detail.swipe === Swipe.Up) {
        collapse();
      }
    }

    function handleClick(e: MouseEvent): void {
      const isUpperSideTouch: boolean =
        e.clientY <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, true);

      const isCurtainCollapsed: boolean =
        curtainHeightRef.current <= CLICK_MARGIN_PERCENTAGE;

      if (isUpperSideTouch && isCurtainCollapsed) {
        expand();
      }
    }

    function handleMouseMove(e: MouseEvent): void {
      const isUpperSideHover: boolean =
        e.clientY <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, true);

      const isCurtainCollapsed: boolean =
        curtainHeightRef.current <= CLICK_MARGIN_PERCENTAGE;

      if (isCurtainCollapsed) {
        isUpperSideHover ? hint() : collapse();
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
          onClick={collapse}
        >
          <BtnShowStart />
        </div>

        <hr className="menu-separator" />

        <label className="menu-section-other">Other:</label>

        <label>reset preferences:</label>
        <div>
          <BtnOptionsReset />
        </div>

        <hr className="menu-separator" />

        <button
          className="btn-curtain-close"
          onClick={collapse}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default MenuCurtain;
