import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { carApi } from '../entities/car/api/carApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(carApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
