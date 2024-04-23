import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/appStore';
import { AnimationType, RaceType } from './types';

const initialState: RaceType = {
  carsInRace: [],
  animationStack: [],
};

export const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    // TODO check the nesserity of this code
    // setCars: (state, action: PayloadAction<CarItemType[]>) => {
    //   state.carsInRace = action.payload;
    // },
    // deleteCars: () => {
    //   return initialState;
    // },
    setAnimationStack: (state, action: PayloadAction<AnimationType>) => {
      state.animationStack.push(action.payload);
    },
    refreshAnimation: (
      state,
      action: PayloadAction<Omit<AnimationType, 'coordinate' | 'isDriving' | 'isStop'>>,
    ) => {
      state.animationStack = state.animationStack.map((item: AnimationType) => {
        if (item.id === action.payload.id) {
          item.animation = action.payload.animation;
        }
        return item;
      });
    },
    refreshCoordinate: (
      state,
      action: PayloadAction<Omit<AnimationType, 'animation' | 'isDriving' | 'isStop'>>,
    ) => {
      state.animationStack = state.animationStack.map((item: AnimationType) => {
        if (item.id === action.payload.id) {
          item.coordinate = action.payload.coordinate;
        }
        return item;
      });
    },
    stopCar: (state, action: PayloadAction<number>) => {
      state.animationStack = state.animationStack.filter(
        (item: AnimationType) => item.id !== action.payload,
      );
    },
    stopRace: () => initialState,
  },
});

export const allCarsInRace = (state: RootState) => state.race.carsInRace;
export const getAllDrivingCars = (state: RootState) => state.race.animationStack;
export const selectCarById = createSelector(
  getAllDrivingCars,
  (_: RootState, carId) => carId,
  (drivingCars, carId) => drivingCars.find((car: AnimationType) => car.id === carId),
);

export const {
  setAnimationStack, refreshAnimation, refreshCoordinate, stopCar, stopRace,
} = raceSlice.actions;