import { createSlice } from "@reduxjs/toolkit";

type initialStateProps = {
  url: object;
  genres: object;
};

const initialState: initialStateProps = {
  url: {},
  genres: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
