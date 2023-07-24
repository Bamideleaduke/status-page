import { configureStore } from "@reduxjs/toolkit";
import serviceDataSlice from "./feature/serviceDataSlice";

export const store = configureStore({
  reducer: {
    serviceData: serviceDataSlice,
  },
});
