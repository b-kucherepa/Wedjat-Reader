"use client";
import { Provider } from "react-redux";
import store from "@/store/store";

import Curtain from "../components/curtain";
import RenderArea from "../components/renderArea";

import BtnLoadBg from "../components/btnLoadBgFiles";
import BtnLoadText from "../components/btnLoadTextData";
import BtnMenuClose from "@/components/btnMenuClose";
import BtnOptionsReset from "../components/btnOptionsReset";
import BtnShowStart from "../components/btnShowEnable";
import OptionBgLayout from "../components/optionBgLayout";
import OptionBgSelect from "../components/optionBgSelect";
import OptionBgSortBy from "../components/optionBgSortBy";
import OptionShowInterval from "../components/optionShowInterval";
import OptionShowRandom from "../components/optionShowIsRandom";
import OptionTextColor from "../components/optionTextColor";
import OptionTextFont from "../components/optionTextFont";
import OptionTextHMargin from "../components/optionTextMarginH";
import OptionTextSize from "../components/optionTextSize";
import OptionTextSpacing from "../components/optionTextSpacing";
import OptionTextVMargin from "../components/optionTextMarginV";

import "./globals.css";

export default function Main() {
  return (
    <main>
      <Provider store={store}>
        <Curtain>
          <div className="menu-content">
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

            <label>spacing:</label>
            <div>
              <OptionTextSpacing />
            </div>

            <label>font:</label>
            <div>
              <OptionTextFont />
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

            <label>layout:</label>
            <div>
              <OptionBgLayout />
            </div>

            <hr className="menu-separator" />

            <label className="menu-section-slideshow">Slide&shy;show:</label>

            <label>inter&shy;val:</label>
            <div>
              <OptionShowInterval /> (s)
            </div>

            <label>sequence:</label>
            <div>
              <OptionShowRandom />
            </div>

            <label>launch:</label>
            <div>
              <BtnShowStart />
            </div>

            <hr className="menu-separator" />

            <label className="menu-section-other">Other:</label>

            <label>reset prefe&shy;rences:</label>
            <div>
              <BtnOptionsReset />
            </div>

            <hr className="menu-separator" />

            <BtnMenuClose />
          </div>
        </Curtain>
        <RenderArea></RenderArea>
      </Provider>
    </main>
  );
}
