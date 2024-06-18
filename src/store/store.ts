import { configureStore } from "@reduxjs/toolkit";
import textSlice from "./textSlice";
import textColorSlice from "./textColorSlice";
import textSizeSlice from "./textSizeSlice";

export default configureStore({
  reducer: { text: textSlice, textColor: textColorSlice, textSize: textSizeSlice },
});
