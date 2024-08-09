import { StateName, StoreActions } from "@/common/constants";

import { createSlice } from "@reduxjs/toolkit";

export enum MenuState {
  Open,
  Close,
  Hint,
}

const DEFAULT_VALUE = MenuState.Close;

export const textSizeSlice = createSlice({
  name: StateName.MENU_STATE,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    [StoreActions.OPEN]: (state) => {
      state.value = MenuState.Open;
    },
    [StoreActions.CLOSE]: (state) => {
      state.value = MenuState.Close;
    },
    [StoreActions.HINT]: (state) => {
      state.value = MenuState.Hint;
    },
    [StoreActions.SET]: (state, action) => {
      state.value = action.payload;
    },
    [StoreActions.RESET]: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
});

export default textSizeSlice.reducer;
