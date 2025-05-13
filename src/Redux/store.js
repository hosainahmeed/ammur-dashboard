import { configureStore } from "@reduxjs/toolkit";
import baseApis from "./baseApis/baseApis";


export const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApis.middleware),
});

export default store;
