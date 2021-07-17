import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCurrentSeasonalAnime,
  findAllAnimeBySearchTerm,
  getLocalSearchResults,
} from "../lib/jikanAPIHelper";

export const loadAnimeResultsFromAPIAsync = createAsyncThunk(
  "animeResults/loadAnimeResultsFromAPIAsync",
  async (searchTerm, thunkAPI) => {
    const res = await findAllAnimeBySearchTerm(searchTerm);
    console.log("Inside loadAnimeResultsFromAPIAsync!");
    return res;
  }
);

export const loadDefaultAnimeResultsFromAPIAsync = createAsyncThunk(
  "animeResults/loadDefaultAnimeResultsFromAPIAsync",
  async () => {
    const res = await getAllCurrentSeasonalAnime();
    console.log("Inside loadDefaultAnimeResultsFromAPIAsync!");
    return res;
  }
);

export const animeResultsSlice = createSlice({
  name: "animeResults",
  initialState: [],
  reducers: {
    setAnimeResults: (state, action) => {
      return action.payload;
    },
    clearAnimeResults: (state) => {
      return [];
    },
    loadAnimeResultsFromLocal: (state) => {
      const result = getLocalSearchResults();
      return result;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAnimeResultsFromAPIAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(
        loadDefaultAnimeResultsFromAPIAsync.fulfilled,
        (state, action) => {
          return action.payload;
        }
      );
  },
});

export const { setAnimeResults, clearAnimeResults, loadAnimeResultsFromLocal } =
  animeResultsSlice.actions;

export const selectAnimeResults = (state) => state.animeResults;

export default animeResultsSlice.reducer;
