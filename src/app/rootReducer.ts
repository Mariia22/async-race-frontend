import { combineReducers } from '@reduxjs/toolkit';
import carSlice from '../entities/car/model/carSlice';
import { carApi } from '../entities/car/api/carApi';

const rootReducer = combineReducers({
  [carSlice.name]: carSlice.reducer,
  [carApi.reducerPath]: carApi.reducer,
});

export default rootReducer;
