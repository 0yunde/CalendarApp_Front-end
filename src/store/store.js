import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice, authSlice } from "./";


//Error de cerializador de fechas por temas de id , sacado de stack overflow
//Lo cual se abstrae de refux toolkit para configurar el middleware

export const store = configureStore({
  reducer: {
    auth:     authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware({
      serializableCheck: false,
    }),
});
