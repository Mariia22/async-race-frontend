import { combineReducers } from '@reduxjs/toolkit';
import { carApi } from '../entities/car/api/carApi';
import { carSlice } from '../entities/car/model/carSlice';
import { raceSlice } from '../entities/race/model/raceSlice';

const rootReducer = combineReducers({
  [carSlice.name]: carSlice.reducer,
  [carApi.reducerPath]: carApi.reducer,
  [raceSlice.name]: raceSlice.reducer,
});

export default rootReducer;
