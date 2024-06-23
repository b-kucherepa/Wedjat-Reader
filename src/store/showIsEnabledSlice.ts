import { NAME_SHOW_IS_ENABLED } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = false;

export const showIsEnabledSlice = createSlice({
  name: NAME_SHOW_IS_ENABLED,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { set, reset } = showIsEnabledSlice.actions;

export default showIsEnabledSlice.reducer;