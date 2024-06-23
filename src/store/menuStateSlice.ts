import { NAME_MENU_STATE } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

export enum MenuState {
  Open,
  Close,
  Hint
}

const DEFAULT_VALUE = MenuState.Close;

export const textSizeSlice = createSlice({
  name: NAME_MENU_STATE,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    open: (state) => {
      state.value = MenuState.Open;
    },
    close: (state) => {
      state.value = MenuState.Close;
    },
    hint: (state) => {
      state.value = MenuState.Hint;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { open, close, hint, set, reset } = textSizeSlice.actions;

export default textSizeSlice.reducer;