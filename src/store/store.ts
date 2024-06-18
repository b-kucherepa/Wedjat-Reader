import { configureStore } from "@reduxjs/toolkit";
import textSlice from "./textSlice";
import textColorSlice from "./textColorSlice";
import textSizeSlice from "./textSizeSlice";
import textVMarginSlice from "./textVMarginSlice";
import textHMarginSlice from "./textHMarginSlice";

export default configureStore({
  reducer: { text: textSlice, textColor: textColorSlice, textSize: textSizeSlice,  textHMargin: textHMarginSlice, textVMargin: textVMarginSlice, },
});
