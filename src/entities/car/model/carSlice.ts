import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarsType } from './types';
import type { RootState } from '../../../app/appStore';

const initialState: CarsType = {
  activeCar: undefined,
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    selectCar(state, action: PayloadAction<number>) {
      state.activeCar = action.payload;
    },
  },
});

export const selectedCar = (state: RootState) => state.car.activeCar;
export const { selectCar } = carSlice.actions;
