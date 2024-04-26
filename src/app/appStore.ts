import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { carApi } from '../entities/car/api/carApi';
import { winnerApi } from '../entities/winner/api/winnerApi';

export const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line max-len
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(carApi.middleware).concat(winnerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
