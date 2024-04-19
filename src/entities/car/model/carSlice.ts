import { createSlice } from '@reduxjs/toolkit';
import { CarsType } from './types';

const initialState: CarsType = {
  cars: [],
};

const carSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    generateCars(state) {
      state.cars.push({ id: 0, name: '', color: '' });
    },
  },
});

export default carSlice;
