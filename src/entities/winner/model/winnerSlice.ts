import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/appStore';
import { WinnerType } from './types';

const initialState: WinnerType = {
  winners: [],
};

export const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinners: (state, action) => {
      state.winners = action.payload;
    },
  },
});
export const selectedAllWinners = (state: RootState) => state.winner.winners;
export const { setWinners } = winnerSlice.actions;
