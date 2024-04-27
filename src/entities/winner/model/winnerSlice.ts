import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/appStore';
import { WinnerType } from './types';

const initialState: WinnerType = {
  currentWinnerPage: 1,
};

export const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinnerCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentWinnerPage = action.payload;
    },
  },
});
export const selectedCurrentWinnerPage = (state: RootState) => state.winner.currentWinnerPage;
export const { setWinnerCurrentPage } = winnerSlice.actions;
