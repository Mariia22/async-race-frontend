import { combineReducers } from '@reduxjs/toolkit';
import { carApi } from '../entities/car/api/carApi';
import { carSlice } from '../entities/car/model/carSlice';

const rootReducer = combineReducers({
  [carSlice.name]: carSlice.reducer,
  [carApi.reducerPath]: carApi.reducer,
});

export default rootReducer;
