import { configureStore } from "@reduxjs/toolkit";
import railwayReducer from "./slices/railwaySlice";

export const store = configureStore({
  reducer: {
    railway: railwayReducer,
  },
});
