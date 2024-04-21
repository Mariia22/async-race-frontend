import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarsType, CarItemType } from './types';
import type { RootState } from '../../../app/appStore';
import { initialCar } from '../../../shared/lib/const';

const initialState: CarsType = {
  activeCar: initialCar,
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    selectCar(state, action: PayloadAction<CarItemType>) {
      state.activeCar = { ...action.payload };
    },
  },
});

export const selectedCar = (state: RootState) => state.car.activeCar;
export const { selectCar } = carSlice.actions;
