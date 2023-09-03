import { configureStore } from "@reduxjs/toolkit";

import { whatsAppApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [whatsAppApi.reducerPath]: whatsAppApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(whatsAppApi.middleware),
});
