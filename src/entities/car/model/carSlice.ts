import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarsType, CarItemType } from './types';
import type { RootState } from '../../../app/appStore';
import { initialCar } from '../../../shared/lib/const';

const initialState: CarsType = {
  activeCar: initialCar,
  currentCarPage: 1,
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    selectCar(state, action: PayloadAction<CarItemType>) {
      state.activeCar = { ...action.payload };
    },
    setCarCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentCarPage = action.payload;
    },
  },
});

export const selectedCar = (state: RootState) => state.car.activeCar;
export const selectedCurrentCarPage = (state: RootState) => state.car.currentCarPage;
export const { selectCar, setCarCurrentPage } = carSlice.actions;
