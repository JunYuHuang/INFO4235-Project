import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import animeDetailReducer from "./animeDetailSlice";
import animeResultsReducer from "./animeResultsSlice";
import userDataReducer from "./userDataSlice";

export const store = configureStore({
  reducer: {
    animeDetail: animeDetailReducer,
    animeResults: animeResultsReducer,
    userData: userDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
