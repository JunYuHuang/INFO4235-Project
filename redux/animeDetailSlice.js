import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAnimeByID, getLocalAnimeDetail } from "../lib/jikanAPIHelper";

export const loadAnimeDetailFromAPIAsync = createAsyncThunk(
  "animeDetail/loadAnimeDetailFromAPIAsync",
  async (animeID, thunkAPI) => {
    const res = await findAnimeByID(animeID);
    console.log("Inside loadAnimeDetailFromAPIAsync!");
    // console.log(res);
    return res;
  }
);

export const animeDetailSlice = createSlice({
  name: "animeDetail",
  initialState: {},
  reducers: {
    setAnimeDetail: (state, action) => {
      return action.payload;
    },
    clearAnimeDetail: (state) => {
      return {};
    },
    loadAnimeDetailFromLocal: (state) => {
      const result = getLocalAnimeDetail();
      return result;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAnimeDetailFromAPIAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setAnimeDetail, clearAnimeDetail, loadAnimeDetailFromLocal } =
  animeDetailSlice.actions;

export const selectAnimeDetail = (state) => state.animeDetail;

export default animeDetailSlice.reducer;
