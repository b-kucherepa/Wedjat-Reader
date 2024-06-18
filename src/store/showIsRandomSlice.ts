import { createSlice } from '@reduxjs/toolkit'

export const showIsRandomSlice = createSlice({
  name: 'showIsRandom',
  initialState: {
    value: false,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { set } = showIsRandomSlice.actions;

export default showIsRandomSlice.reducer;