import { createSlice } from '@reduxjs/toolkit'

export const showIsEnabledSlice = createSlice({
  name: 'showIsEnabled',
  initialState: {
    value: false,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { set } = showIsEnabledSlice.actions;

export default showIsEnabledSlice.reducer;