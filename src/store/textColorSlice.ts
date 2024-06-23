import { NAME_TEXT_COLOR } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = "#FFFFFF";

export const textColorSlice = createSlice({
  name: NAME_TEXT_COLOR,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { set, reset } = textColorSlice.actions;

export default textColorSlice.reducer;