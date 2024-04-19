import { combineReducers } from '@reduxjs/toolkit';
import carSlice from '../entities/car/model/carSlice';

const rootReducer = combineReducers({
  [carSlice.name]: carSlice.reducer,
});

export default rootReducer;
