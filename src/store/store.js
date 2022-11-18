import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

//Error de cerializador de fechas por temas de id , sacado de stack overflow
//Lo cual se abstrae de refux toolkit para configurar el middleware

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware({
      serializableCheck: false,
    }),
});
