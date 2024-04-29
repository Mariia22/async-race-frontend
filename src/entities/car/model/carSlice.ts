import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarsType, CarItemType } from './types';
import type { RootState } from '../../../app/appStore';
import { initialColor } from '../../../shared/lib/const';

const initialState: CarsType = {
  currentCarPage: 1,
  activeCar: null,
  templateForCreatingCar: { id: 0, name: '', color: initialColor },
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentCarPage = action.payload;
    },
    selectCar(state, action: PayloadAction<CarItemType>) {
      state.activeCar = { ...action.payload };
    },
    unselectCar(state) {
      state.activeCar = initialState.activeCar;
    },
    setActiveCarName(state, action: PayloadAction<string>) {
      if (!state.activeCar) return;
      state.activeCar = { ...state.activeCar, name: action.payload };
    },
    setActiveCarColor(state, action: PayloadAction<string>) {
      if (!state.activeCar) return;
      state.activeCar = { ...state.activeCar, color: action.payload };
    },
    setNewCarName(state, action: PayloadAction<string>) {
      state.templateForCreatingCar = { ...state.templateForCreatingCar, name: action.payload };
    },
    setNewCarColor(state, action: PayloadAction<string>) {
      state.templateForCreatingCar = { ...state.templateForCreatingCar, color: action.payload };
    },
    resetTemplateForCreatingCar(state) {
      state.templateForCreatingCar = initialState.templateForCreatingCar;
    },
  },
});

export const selectedCar = (state: RootState) => state.car.activeCar;
export const selectedCurrentCarPage = (state: RootState) => state.car.currentCarPage;
export const templateForCreatingCar = (state: RootState) => state.car.templateForCreatingCar;
export const {
  selectCar,
  unselectCar,
  setCarCurrentPage,
  setNewCarName,
  setNewCarColor,
  setActiveCarName,
  setActiveCarColor,
  resetTemplateForCreatingCar,
} = carSlice.actions;
