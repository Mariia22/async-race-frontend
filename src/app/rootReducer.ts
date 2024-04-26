import { combineReducers } from '@reduxjs/toolkit';
import { carApi } from '../entities/car/api/carApi';
import { carSlice } from '../entities/car/model/carSlice';
import { raceSlice } from '../entities/race/model/raceSlice';
import { winnerSlice } from '../entities/winner/model/winnerSlice';
import { winnerApi } from '../entities/winner/api/winnerApi';

const rootReducer = combineReducers({
  [carSlice.name]: carSlice.reducer,
  [carApi.reducerPath]: carApi.reducer,
  [raceSlice.name]: raceSlice.reducer,
  [winnerApi.reducerPath]: winnerApi.reducer,
  [winnerSlice.name]: winnerSlice.reducer,
});

export default rootReducer;
